const bcrypt = require('bcryptjs');
const knex = require('../../database/connection');
const letterForgotPassword = require('../../common/letterForgotPwd');
const letterActiveEmail = require('../../common/letterActiveEmail');
const generateId = require('../../common/generateId');
const sendMyMail = require('../../common/nodemailer.config');
const { DBError, SendMailError } = require('../../common/customErr');

const renderSignInView = (req, res) => {
    // error sent by handleSingIn
    const errors = req.flash('errors');
    res.render('admin/pages/signIn', { error: errors[0], email: errors[1] });
};

const handleSignIn = async (req, res, next) => {
    const { email, password } = req.body;

    // ? check email is exist in `users`
    let isExistEmail;
    try {
        isExistEmail = await knex
            .select()
            .from('users')
            .where({ email })
            .first();
    } catch (err) {
        return next(new DBError(err.message));
    }
    if (!isExistEmail) {
        req.flash('errors', ['Email or password is not correct!', email]);
        return res.redirect('/admin/accounts/signin');
    }

    // ? Compare password between client and `users`.password
    const user = isExistEmail;
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
        req.flash('errors', ['Email or password is not correct!', email]);
        return res.redirect('/admin/accounts/signin');
    }

    // ? Find in `session` table if `sessions.data` column include user.id. If include,
    // ? dont allow login because dont allow mutiple logins from 1 account

    // ? Filter session in `sessions` table which include user.id
    const isLogining = await knex('sessions').where(
        'data',
        'like',
        `%${user.id}%`
    );

    // ? Check that current sessions has expired?
    let isNotExpired = 0;
    if (isLogining.length > 0) {
        for (let i = 0; i < isLogining.length; i += 1) {
            // ? Date now for milisecond => Date.now() / 1000 for second
            const currentTime = Date.now() / 1000;
            // ? if current session is not expired, so incree checkExpired
            if (isLogining[i].expires > currentTime) {
                isNotExpired += 1;
            }
        }
    }

    // ? If current account is logining, so we dont allow mutiple login
    if (isNotExpired !== 0) {
        try {
            await knex('sessions')
                .where('data', 'like', `%${user.id}%`)
                .del();
        } catch (err) {
            next(new DBError(err.message));
        }
        req.flash('blankMessage', 'Your account is being logged elsewhere');
        return res.redirect('/admin/blank-message');
    }

    // ? If a current user is not logining, allow login
    req.session.user = user;
    return res.redirect('/admin');
};

const renderSignUpView = (req, res) => {
    const error = req.flash('error')[0]; // error sent by handleSignUp
    res.render('admin/pages/signUp', { error });
};

const handleSignUp = async (req, res, next) => {
    const { error, user } = res.locals;

    // ? check errors in previous middleware(validate password);
    if (error.status === 'hasError') {
        req.flash('error', error);
        return res.redirect('/admin/accounts/signup');
    }

    // ? check if email already existed in `users` table, send error to render in signup view
    let checkEmail;
    try {
        checkEmail = await knex
            .select('email')
            .from('users')
            .where({ email: user.email })
            .first();
    } catch (err) {
        return next(new DBError(err.message));
    }

    if (checkEmail) {
        error.email = 'Email đã tồn tại';
        req.flash('error', error);
        return res.redirect('/admin/accounts/signup');
    }

    // ? If email is not in  `users` table, then create new account with that email
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    await knex('users').insert(user);

    // ? And save data in `active_email` table to send email which help active email
    const expireToken = String(Date.now() + 30 * 60 * 1000);
    const activeEmailData = {
        id: generateId(),
        id_user: user.id,
        token: generateId(),
        expire: expireToken,
    };
    try {
        await knex('active_email').insert(activeEmailData);
    } catch (err) {
        return next(new DBError(err.message));
    }

    const toEmail = user.email;
    const fromName = 'VyXinhGais Blog';
    const subject = 'Active mail';
    const text = 'VyXinhGais Blog';
    const linkActive = `${process.env.HOST}admin/accounts/active-email?token=${activeEmailData.token}`;
    const html = letterActiveEmail(linkActive);

    try {
        sendMyMail(toEmail, fromName, subject, text, html);
    } catch (err) {
        return next(new SendMailError(err.message));
    }

    // ? After sending email successfully
    return res.redirect('/admin/accounts/check-mail');
};

const activeEmail = async (req, res) => {
    // ? ${process.env.HOST}/admin/accounts/active-email?token=abcxyz
    const { token } = req.query;

    // ? activeEmailData = {id: ..., id_user: ..., token: ..., expire: ...}
    const activeEmailData = await knex('active_email')
        .select()
        .where({ token })
        .first();

    // ? check if the token is not in `active_email` table, we send message
    if (!activeEmailData) {
        req.flash('blankMessage', 'Token is not exist');
        return res.redirect('/admin/blank-message');
    }

    // ? check if token is expried
    const currentTime = Date.now();
    if (currentTime > Number(activeEmailData.expire)) {
        req.flash('blankMessage', 'Token is expired');
        return res.redirect('/admin/blank-message');
    }

    // ? And if token is not expried,
    // ? we proceed to update `users`.is_active_email,
    // ? and delete row include token in `active_email`
    // ? then update the session, if the session is the email-activated user's own
    await Promise.all([
        knex('users')
            .where({ id: activeEmailData.id_user })
            .update({
                is_active_email: true,
            }),
        knex('active_email')
            .where({ id: activeEmailData.id })
            .del(),
    ]);
    if (
        req.session &&
        req.session.user &&
        req.session.user.id === activeEmailData.id_user
    ) {
        req.session.user.is_active_email = 1;
    }

    req.flash('blankMessage', 'Email is actived successfully!');
    return res.redirect('/admin/blank-message');
};

// ? After user login with unactive account,
// ? user will see message `resend active mail` at home page
const resendActiveEmail = async (req, res, next) => {
    // ? get infomation of current user;
    const { user } = req.session;

    const expireToken = String(Date.now() + 30 * 60 * 1000);
    const newActiveEmailData = {
        id_user: user.id,
        token: generateId(),
        expire: expireToken,
    };

    // ? if request active email of current user exist in `active_email`
    try {
        // ? yes, update new token and new expire token
        await knex('active_email')
            .where({ id_user: user.id })
            .update(newActiveEmailData);

        // ? no, insert new data into `active_email`
        await knex('active_email').insert(newActiveEmailData);
    } catch (err) {
        return next(new DBError(err.message));
    }

    const toEmail = user.email;
    const fromName = 'VyXinhGais Blog';
    const subject = 'Active mail';
    const text = 'VyXinhGais Blog';
    const linkActive = `${process.env.HOST}admin/accounts/active-email?token=${newActiveEmailData.token}`;
    const html = letterActiveEmail(linkActive);

    // ? send active mail
    sendMyMail(toEmail, fromName, subject, text, html);

    req.flash(
        'resendActiveEmailSuccess',
        `Đã gửi Email active thành công,vui lòng check mail ${user.email}`
    );
    return res.redirect('/admin');
};

const signout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        return res.redirect('/admin/accounts/signin');
    });
};

const renderForgotPassword = (req, res) => {
    const err = req.flash('emailNotExist'); // message sent by sendEmailToResetPassword
    return res.render('admin/pages/forgot-password', {
        error: err[0],
        email: err[1],
    });
};

const sendEmailToResetPassword = async (req, res, next) => {
    const { toEmail } = req.body;

    // ? check if this email exist in `users`?
    let userNeedResetPwd;
    try {
        userNeedResetPwd = await knex('users')
            .select()
            .where({ email: toEmail })
            .first();
    } catch (err) {
        return next(new DBError(err.message));
    }

    if (!userNeedResetPwd) {
        req.flash('emailNotExist', ['Email khong ton tai', toEmail]);
        return res.redirect('/admin/accounts/forgot-password');
    }

    const expireToken = (Date.now() + 30 * 60 * 1000).toString();
    const newForgotPwdData = {
        id_user: userNeedResetPwd.id,
        token: generateId(),
        expire: expireToken,
    };

    try {
        // ? delete all old `forgot_password` of current user
        await knex('forgot_password')
            .where({ id_user: userNeedResetPwd.id })
            .del();

        await knex('forgot_password').insert({
            id: generateId(),
            ...newForgotPwdData,
        });
    } catch (err) {
        return next(new SendMailError(err.message));
    }

    const fromName = 'VyXinhGais Blog';
    const subject = 'Forgot password';
    const text = 'VyXinhGais Blog';
    const linkActive = `${process.env.HOST}admin/accounts/recover-password?token=${newForgotPwdData.token}`;
    const html = letterForgotPassword(linkActive);

    try {
        sendMyMail(toEmail, fromName, subject, text, html);
    } catch (err) {
        return next(new SendMailError(err.message));
    }

    return res.redirect('/admin/accounts/check-mail');
};

const renderCheckMail = (req, res) => {
    console.log('render checkmail');
    return res.render('admin/pages/checkMailMessage');
};

const renderRecoverPwd = (req, res) => {
    const error = req.flash('error');
    return res.render('admin/pages/recover-password', {
        error: error[0],
    });
};

const resetPassword = async (req, res, next) => {
    const { token } = req.query;
    const { retypePassword } = req.body;
    let { newPassword } = req.body;

    if (newPassword !== retypePassword) {
        req.flash('error', {
            retypePassword: 'Retype password is not correct',
        });
        return res.redirect(`/admin/accounts/recover-password?token=${token}`);
    }

    if (
        !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            newPassword
        )
    ) {
        req.flash('error', {
            password:
                'Password must be at least 8 characters, include at least 1 special character, 1 number, 1 uppercase',
        });
        return res.redirect(`/admin/accounts/recover-password?token=${token}`);
    }

    // ? if password is validate, next,we will check token exist in `forgot_password` ?
    const forgotPwdData = await knex('forgot_password')
        .where({ token })
        .select()
        .first();

    // ? if not
    if (!forgotPwdData) {
        req.flash('blankMessage', 'Token is invalidate');
        return res.redirect('/admin/blank-message');
    }

    // ? if has, next, we will check token is expired ?
    const now = Date.now();

    // ? if token expired
    if (now > Number(forgotPwdData.expire)) {
        req.flash('blankMessage', 'Token is expired!');
        return res.redirect('/admin/blank-message');
    }

    // ? if token NOT expire, we will hash password + update pwd + delete `forgot_password`
    // ? and logout all account from `sessions`
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);
    newPassword = hash;

    try {
        await knex('users')
            .where({ id: forgotPwdData.id_user })
            .update({
                password: newPassword,
            });
        await knex('forgot_password')
            .where({ id: forgotPwdData.id })
            .del();
        await knex('sessions')
            .where('data', 'like', `%${forgotPwdData.id_user}%`)
            .del();
    } catch (err) {
        return next(new DBError(err.message));
    }

    req.flash('blankMessage', 'Reset your password successfully!');
    return res.redirect('/admin/blank-message');
};

module.exports = {
    renderSignInView,
    renderSignUpView,
    handleSignUp,
    handleSignIn,
    signout,
    renderForgotPassword,
    sendEmailToResetPassword,
    renderCheckMail,
    activeEmail,
    resendActiveEmail,
    renderRecoverPwd,
    resetPassword,
};
