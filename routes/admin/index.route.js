const express = require('express');
const multer = require('multer');

const router = express.Router();
const multerConfig = require('./../../common/multer.config');

const storage = multer.diskStorage(multerConfig.storage);
const upload = multer({ storage });

const verify = require('../../middleware/verify');
const homeController = require('../../controller/home.controller');
const postController = require('../../controller/post.controller');
const newPostController = require('../../controller/newPost.controller');
const tagController = require('../../controller/tag.controller');

router.get('/', verify.isSignIn, homeController.renderHomePage);

router.get('/posts', verify.isSignIn, postController.renderPostPage);

router.get('/newpost', verify.isSignIn, newPostController.renderNewPostPage);

router.post(
    '/newpost/image',
    verify.isSignIn,
    upload.single('imageUpload'),
    newPostController.uploadImg
);

router.post('/newpost', verify.isSignIn, newPostController.savePost);

router.get('/tags', verify.isSignIn, tagController.renderTagPage);

router.post('/tags', verify.isSignIn, tagController.addNewTag);

router.get('/tags/:id', verify.isSignIn, tagController.editTag);

router.put('/tags/:id', verify.isSignIn, tagController.updateTag);

router.delete('/tags/:id', verify.isSignIn, tagController.deleteTask);

module.exports = router;
