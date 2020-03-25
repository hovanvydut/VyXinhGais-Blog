const express = require('express');

const router = express.Router();
const controller = require('../../controller/admin/accounts.controlelr');
const middleware = require('../../middleware/accounts.middleware');
const verify = require('../../middleware/verify');

router.get('/signin', verify.signedIn, controller.renderSignInView);

router.post('/signin', verify.signedIn, controller.handleSignIn);

router.get('/signup', controller.renderSignUpView);

router.post('/signup', middleware.validateSignUp, controller.handleSignUp);

router.get('/signout', controller.signout);

module.exports = router;
