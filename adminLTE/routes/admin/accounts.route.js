const express = require('express');

const router = express.Router();
const controller = require('../../controller/admin/accounts.controlelr');
const middleware = require('../../middleware/accounts.middleware');
const verify = require('../../middleware/verify');

router
    .get('/signin', verify.signedIn, controller.renderSignInView)
    .post('/signin', verify.signedIn, controller.handleSignIn);

router
    .get('/signup', verify.signedIn, controller.renderSignUpView)
    .post(
        '/signup',
        verify.signedIn,
        middleware.validateSignUp,
        controller.handleSignUp
    )
    .get('/active-email', controller.activeEmail)
    .get('/resend-active-email', controller.resendActiveEmail);

router
    .get('/forgot-password', verify.signedIn, controller.renderForgotPassword)
    .post('/forgot-password', verify.signedIn, controller.handleForgotPwd)
    .get('/check-mail', verify.signedIn, controller.renderCheckMail);

router.get('/signout', controller.signout);

module.exports = router;
