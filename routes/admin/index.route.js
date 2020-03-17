const express = require('express');

const router = express.Router();

const verify = require('../../middleware/verify');
const homeController = require('../../controller/home.controller');
const postController = require('../../controller/post.controller');
const newPostController = require('../../controller/newPost.controller');
const tagController = require('../../controller/tag.controller');

router.use(verify.isSignIn);

router.get('/', homeController.renderHomePage);

router.get('/posts', postController.renderPostPage);

router.get('/newpost', newPostController.renderNewPostPage);

router.get('/tags', tagController.renderTagPage);

router.post('/tags', tagController.addNewTag);

router.get('/tags/:id', tagController.editTag);

router.put('/tags/:id', tagController.updateTag);

router.delete('/tags/:id', tagController.deleteTask);

module.exports = router;
