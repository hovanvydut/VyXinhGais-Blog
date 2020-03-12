const express = require('express');

const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const layoutPath = require('../common/layoutPath');
const verify = require('./../middleware/verify');

router.use(expressLayouts);

router.get('/', verify.signIn, (req, res) => {
    res.render('pages/home', {
        layout: layoutPath.PRIMARY_LAYOUT,
    });
});

router.get('/posts', verify.signIn, (req, res) => {
    console.log('------index.route: /posts -------------');
    console.log('req.sessionID: ', req.sessionID);
    console.log('req.session.cookie: ', req.session.cookie);
    console.log('req.signedCookies: ', req.signedCookies);
    console.log(
        'cookieParser.signedCookie: ',
        cookieParser.signedCookie(
            req.signedCookies['vy-session'],
            process.env.SESSION_COOKIE_SECRET
        )
    );

    res.render('pages/post', {
        layout: layoutPath.PRIMARY_LAYOUT,
        title: 'Danh sách tất cả các bài viết',
        breadscrumb: [
            { content: 'hihi', href: '/abc' },
            { content: 'haha', href: '#' },
        ],
    });
});

router.get('/newpost', verify.signIn, (req, res) => {
    res.render('pages/newPost', {
        layout: layoutPath.PRIMARY_LAYOUT,
        title: 'Bài viết mới',
        breadscrumb: [
            { content: 'danh sách bài viết', href: '/post' },
            { content: 'bài viết mới', href: '#' },
        ],
    });
});

module.exports = router;
