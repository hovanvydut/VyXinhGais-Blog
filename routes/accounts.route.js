const express = require('express');

const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const controller = require('../controller/accounts.controlelr');
const middleware = require('../middleware/accounts.middleware');

router.use(expressLayouts);

router.get('/signin', controller.renderSignInView);

router.post('/signin', controller.handleSignIn);

router.get('/signup', controller.renderSignUpView);

router.post('/signup', middleware.validateSignUp, controller.handleSignUp);

module.exports = router;
