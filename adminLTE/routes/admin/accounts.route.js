const express = require('express');

const router = express.Router();
const controller = require('../../controller/admin/accounts.controlelr');
const middleware = require('../../middleware/accounts.middleware');
const verify = require('../../middleware/verify');

router
    .get('/signin', verify.signedIn, controller.renderSignInView)
    .post('/signin', verify.signedIn, controller.handleSignIn);

router
    .get('/signup', controller.renderSignUpView)
    .post('/signup', middleware.validateSignUp, controller.handleSignUp);

router.get(
    '/forgot-password',
    verify.signedIn,
    controller.renderForgotPassword
);

router.get('/signout', controller.signout);

module.exports = router;
