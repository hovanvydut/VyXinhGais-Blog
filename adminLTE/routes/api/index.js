const express = require('express');

const router = express.Router();
const postControl = require('./../../controller/api/post.api.control');
const tagControl = require('./../../controller/api/tag.api.control');
const categoryControl = require('./../../controller/api/category.api.control');
const popularArticleControl = require('./../../controller/api/popularArticle.api.control');
const authControl = require('./../../controller/api/auth.api.control');

router.get('/thumb-posts', postControl.getThumbPost);

router.get('/posts/:linkPost', postControl.getPost);

router.get('/tags', tagControl.getAllTags);

router.get('/categories', categoryControl.getAllCategories);

router.get('/popular-article', popularArticleControl.getAllPopularArticle);

router
    .post('/login', authControl.handleLogin)
    .post('/signup', authControl.handleSignup);

module.exports = router;
