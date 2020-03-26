const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const bcrypt = require('bcryptjs');
const knex = require('../../database/connection');
const letterForgotPassword = require('../../common/letterForgotPwd');
const letterActiveEmail = require('../../common/letterActiveEmail');
const generateId = require('../../common/generateId');

const renderSignInView = (req, res) => {
    const errors = req.flash('errors');
    res.render('admin/pages/signin', { error: errors[0], email: errors[1] });
};

const renderSignUpView = (req, res) => {
    const error = req.flash('error')[0];
    console.log(error);
    res.render('admin/pages/signup', { error });
};

const handleSignUp = async (req, res) => {
    const { error, user } = res.locals;

    if (error.status === 'hasError') {
        req.flash('error', error);
        return res.redirect('/admin/accounts/signup');
    }

    const checkEmail = await knex
        .select('email')
        .from('users')
        .where({ email: user.email });

    if (checkEmail.length > 0) {
        console.log('email ton tai');
        error.email = 'Email đã tồn tại';
        req.flash('error', error);
        return res.redirect('/admin/accounts/signup');
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    await knex('users').insert(user);

    const expireToken = String(Date.now() + 30 * 60 * 1000);
    const activeEmailData = {
        id: generateId(),
        id_user: user.id,
        token: generateId(),
        expire: expireToken,
    };
    await knex('active_email').insert(activeEmailData);

    const transporter = nodemailer.createTransport(
        smtpTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_ACCOUNT,
                pass: process.env.MAIL_PASSWORD,
            },
            tls: { rejectUnauthorized: false },
        })
    );
    const toEmail = user.email;
    const linkActive = `http://localhost:3000/admin/accounts/active-email?token=${activeEmailData.token}`;
    await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT,
        to: toEmail,
        subject: 'Active your account | VyXinhGais ✔',
        text: 'VyXinhGais Blog',
        html: letterActiveEmail(linkActive),
    });
    return res.redirect('/admin/accounts/check-mail');
};

const activeEmail = async (req, res) => {
    const { token } = req.query;
    const activeEmailData = await knex('active_email')
        .select()
        .where({ token })
        .first();
    const currentTime = Date.now();

    if (!activeEmailData) {
        return res.send(
            'Token da het han, vui long login -> homepage de yeu cau active email again!'
        );
    }

    if (currentTime <= Number(activeEmailData.expire)) {
        await knex('users')
            .where({ id: activeEmailData.id_user })
            .update({
                is_active_email: true,
            });

        await knex('active_email')
            .where({ id: activeEmailData.id })
            .del();

        if (req.session && req.session.user) {
            req.session.user.is_active_email = 1;
        }

        return res.send(
            'Email da duoc active thanh cong, vui long quay lai trang login de dang nhap: /admin/accounts/signin'
        );
    }

    return res.send(
        'Token da het han, vui long login -> homepage de yeu cau active email again!'
    );
};

const resendActiveEmail = async (req, res) => {
    const { user } = req.session;
    const oldActiveEmailData = await knex('active_email')
        .select()
        .where({ id_user: user.id })
        .first();

    const expireToken = String(Date.now() + 30 * 60 * 1000);
    const newActiveEmailData = {
        id_user: user.id,
        token: generateId(),
        expire: expireToken,
    };

    if (oldActiveEmailData) {
        await knex('active_email')
            .where({ id: oldActiveEmailData.id })
            .update(newActiveEmailData);
    } else {
        newActiveEmailData.id = generateId();
        await knex('active_email').insert(newActiveEmailData);
    }

    const toEmail = user.email;
    const linkActive = `http://localhost:3000/admin/accounts/active-email?token=${newActiveEmailData.token}`;
    const transporter = nodemailer.createTransport(
        smtpTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_ACCOUNT,
                pass: process.env.MAIL_PASSWORD,
            },
            tls: { rejectUnauthorized: false },
        })
    );
    await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT,
        to: toEmail,
        subject: 'Active your account | VyXinhGais ✔',
        text: 'VyXinhGais Blog',
        html: letterActiveEmail(linkActive),
    });
    req.flash(
        'resendActiveEmailSuccess',
        `Đã gửi Email active thành công,vui lòng check mail ${user.email}`
    );
    return res.redirect('/admin');
};

const handleSignIn = async (req, res) => {
    const { email, password } = req.body;

    // check email is exist in DB
    const isExistEmail = await knex
        .select()
        .from('users')
        .where({ email });

    if (isExistEmail.length > 0) {
        const user = isExistEmail[0];

        // Compare password between client and DB
        const comparePassword = bcrypt.compareSync(password, user.password);

        if (comparePassword) {
            /* Find in `session` table if `sessions.data` column include user.id. If include,
                dont allow login because dont allow mutiple logins from 1 account */

            // Filter sessions in `sessions` table which include user.id
            const isLogining = await knex('sessions').where(
                'data',
                'like',
                `%${user.id}%`
            );

            // Check that current sessions has expired?
            let isNotExpired = 0;
            if (isLogining.length > 0) {
                for (let i = 0; i < isLogining.length; i += 1) {
                    // Date now for milisecond => Date.now() / 1000 for second
                    const currentTime = Date.now() / 1000;
                    // if current session is not expired, so incree checkExpired
                    if (isLogining[i].expires > currentTime) {
                        isNotExpired += 1;
                    }
                }
            }

            // If a user is logining, dont allow mutiple login
            if (isNotExpired !== 0) {
                console.log('Đang có tài khoản login');
                return res.redirect('/admin/accounts/signup');
            }

            // If a user is not logining, allow login
            // saveUninitialize:  false help skip empty session save back store
            req.session.user = user;

            console.log('Login thanh cong');
            return res.redirect('/admin');
        }
        console.log('Sai mat khau');
        req.flash('errors', ['Email or password is not correct!', email]);
        return res.redirect('/admin/accounts/signin');
    }
    console.log('Sai tài khoản');
    req.flash('errors', ['Email or password is not correct!', email]);
    return res.redirect('/admin/accounts/signin');
};

const renderForgotPassword = (req, res) => {
    console.log('render forgot password');
    return res.render('admin/pages/forgot-password');
};

const handleForgotPwd = async (req, res) => {
    const { toEmail } = req.body;
    console.log(toEmail);
    const transporter = nodemailer.createTransport(
        smtpTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_ACCOUNT,
                pass: process.env.MAIL_PASSWORD,
            },
            tls: { rejectUnauthorized: false },
        })
    );

    try {
        await transporter.sendMail({
            from: process.env.MAIL_ACCOUNT,
            to: toEmail,
            subject: 'Reset Password | VyXinhGais ✔',
            text: 'Hello world?',
            html: letterForgotPassword(),
        });
    } catch (err) {
        return res.redirect('/admin/accounts/check-mail');
    }

    return res.redirect('/admin/accounts/check-mail');
};

const renderCheckMail = (req, res) => {
    console.log('render check mail message page');
    return res.render('admin/pages/checkMailMessage');
};

const signout = function(req, res) {
    req.session.destroy((err) => {
        console.log('Logout');
        res.redirect('/admin/accounts/signin');
    });
};

module.exports = {
    renderSignInView,
    renderSignUpView,
    handleSignUp,
    handleSignIn,
    signout,
    renderForgotPassword,
    handleForgotPwd,
    renderCheckMail,
    activeEmail,
    resendActiveEmail,
};
