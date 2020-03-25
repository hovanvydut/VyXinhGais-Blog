const bcrypt = require('bcryptjs');
const knex = require('../../database/connection');

const renderSignInView = (req, res) => {
    const error = req.flash('errors')[0];
    res.render('admin/pages/signin', { error });
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
    console.log(salt);

    const hash = bcrypt.hashSync(user.password, salt);
    console.log(hash);

    user.password = hash;

    await knex.insert(user).into('users');
    res.redirect('/admin/accounts/signin');
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
        req.flash('errors', ['Email or password is not correct!']);
        return res.redirect('/admin/accounts/signin');
    }
    console.log('Sai tài khoản');
    req.flash('errors', ['Email or password is not correct!']);
    return res.redirect('/admin/accounts/signin');
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
};
