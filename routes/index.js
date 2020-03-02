const express = require('express');

const router = express.Router();

router
    .get('/', (req, res) => {
        res.render('pages/home');
    })
    .get('/posts', (req, res) => {
        res.render('pages/post', {
            title: 'Danh sách tất cả các bài viết',
            breadscrumb: [
                { content: 'hihi', href: '/abc' },
                { content: 'haha', href: '#' },
            ],
        });
    })
    .get('/newpost', (req, res) => {
        res.render('pages/newPost', {
            title: 'Bài viết mới',
            breadscrumb: [
                { content: 'danh sách bài viết', href: '/post' },
                { content: 'bài viết mới', href: '#' },
            ],
        });
    });

module.exports = router;
