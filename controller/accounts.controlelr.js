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
    const result = await knex
        .select()
        .from('users')
        .where({ email });
    if (result.length > 0) {
        const user = result[0];
        const passLogin = bcrypt.compareSync(password, user.password);
        if (passLogin) {
            console.log('Login thanh cong');

            req.session.user = {
                id: user.id,
            };

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
        console.log('Da xoa session, err = ', err);
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
