const express = require('express');

const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const controller = require('../controller/accounts.controlelr');
const middleware = require('../middleware/accounts.middleware');
const verify = require('../middleware/verify');

router.use(expressLayouts);

router.get('/signin', verify.signedIn, controller.renderSignInView);

router.post('/signin', verify.signedIn, controller.handleSignIn);

router.get('/signup', controller.renderSignUpView);

router.post('/signup', middleware.validateSignUp, controller.handleSignUp);

router.get('/signout', controller.signout);

module.exports = router;
