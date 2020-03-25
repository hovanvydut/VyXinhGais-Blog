const express = require('express');

const router = express.Router();
const controller = require('./../../controller/api/post.api.control');

router.get('/thumb-posts', controller.getThumbPost);

router.get('/posts/:linkPost', controller.getPost);

module.exports = router;
