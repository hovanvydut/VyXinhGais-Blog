const express = require('express');

const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const layoutPath = require('../common/layoutPath');
const verify = require('./../middleware/verify');

router.use(expressLayouts);

router.get('/', verify.signIn, (req, res) => {
    res.render('pages/home', {
        layout: layoutPath.PRIMARY_LAYOUT,
    });
});

router.get('/posts', verify.signIn, (req, res) => {
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
