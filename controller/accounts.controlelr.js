const bcrypt = require('bcryptjs');
const layoutPath = require('../common/layoutPath');
const knex = require('./../database/connection');

const renderSignInView = (req, res) => {
    res.render('pages/signIn', { layout: layoutPath.SECOND_LAYOUT });
};

const renderSignUpView = (req, res) => {
    res.render('pages/signUp', { layout: layoutPath.SECOND_LAYOUT });
};

const handleSignUp = async (req, res) => {
    const { error, user } = res.locals;
    console.log(error);

    if (error.length > 0) {
        return res.redirect('/accounts/signup');
    }

    const checkEmail = await knex
        .select('email')
        .from('users')
        .where({ email: user.email });

    if (checkEmail.length > 0) {
        console.log('email ton tai');
        return res.redirect('/accounts/signup');
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    console.log(salt);

    const hash = bcrypt.hashSync(user.password, salt);
    console.log(hash);

    user.password = hash;

    await knex.insert(user).into('users');
    res.redirect('/accounts/signin');
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
                console.log('Dang co tai khoan login');
                return res.redirect('/accounts/signup');
            }

            // If a user is not logining, allow login
            req.session.user = {
                id: user.id,
            };

            res.cookie('testCookieParser', 'hovanvy', {
                signed: true,
                maxAge: 10 * 60 * 60,
            });

            console.log('Login thanh cong');

            res.redirect('/');
        } else {
            console.log('Sai mat khau');
            res.redirect('/accounts/signin');
        }
    } else {
        console.log('Sai tài khoản');
        res.redirect('/accounts/signin');
    }
};

const signout = function(req, res) {
    req.session.destroy((err) => {
        console.log('Logout');
        res.clearCookie('testCookieParser');
        res.redirect('/accounts/signin');
    });
};

module.exports = {
    renderSignInView,
    renderSignUpView,
    handleSignUp,
    handleSignIn,
    signout,
};
