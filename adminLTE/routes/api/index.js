const express = require('express');

const router = express.Router();
const postControl = require('./../../controller/api/post.api.control');
const tagControl = require('./../../controller/api/tag.api.control');
const categoryControl = require('./../../controller/api/category.api.control');

router.get('/thumb-posts', postControl.getThumbPost);

router.get('/posts/:linkPost', postControl.getPost);

router.get('/tags', tagControl.getAllTags);

router.get('/categories', categoryControl.getAllCategories);

module.exports = router;
