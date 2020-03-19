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

router
    .get('/posts', verify.isSignIn, postController.renderPostPage)
    .get('/posts/:idPost', verify.isSignIn, postController.renderEditPost)
    .put('/posts/:idPost', verify.isSignIn, postController.updatePost)
    .delete('/posts/:idPost', verify.isSignIn, postController.deletePost);

router
    .get('/newpost', verify.isSignIn, newPostController.renderNewPostPage)
    .post(
        '/newpost/image',
        verify.isSignIn,
        upload.single('imageUpload'),
        newPostController.uploadImg
    )
    .post('/newpost', verify.isSignIn, newPostController.savePost);

router
    .get('/tags', verify.isSignIn, tagController.renderTagPage)
    .post('/tags', verify.isSignIn, tagController.addNewTag)
    .get('/tags/:id', verify.isSignIn, tagController.editTag)
    .put('/tags/:id', verify.isSignIn, tagController.updateTag)
    .delete('/tags/:id', verify.isSignIn, tagController.deleteTask);

module.exports = router;
