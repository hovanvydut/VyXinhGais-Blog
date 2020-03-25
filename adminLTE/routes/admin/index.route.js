const express = require('express');
const multer = require('multer');

const router = express.Router();
const multerConfig = require('./../../common/multer.config');

const storage = multer.diskStorage(multerConfig.storage);
const upload = multer({ storage });

const verify = require('../../middleware/verify');
const validate = require('../../middleware/validation');
const homeController = require('../../controller/home.controller');
const userController = require('../../controller/user.controller');
const postController = require('../../controller/post.controller');
const newPostController = require('../../controller/newPost.controller');
const category = require('../../controller/category.controller');
const tagController = require('../../controller/tag.controller');
const profileController = require('../../controller/profile.controller');

router.get('/', verify.isSignIn, homeController.renderHomePage);

router
    .get(
        '/users',
        verify.isSignIn,
        verify.isAdmin,
        userController.renderUserPage
    )
    .get(
        '/users/:userID',
        verify.isSignIn,
        verify.isAdmin,
        userController.renderEditUser
    )
    .put(
        '/users/:userID',
        verify.isSignIn,
        verify.isAdmin,
        validate.updateUser,
        userController.updateUser
    )
    .delete(
        '/users/:userID',
        verify.isSignIn,
        verify.isAdmin,
        userController.deleteUser
    );

router.get(
    '/profile/:userID',
    verify.isSignIn,
    profileController.renderProfile
);

router
    .get(
        '/posts',
        verify.isSignIn,
        verify.isAdmin,
        postController.renderPostPage
    )
    .get(
        '/posts/:idPost',
        verify.isSignIn,
        verify.isAdmin,
        postController.renderEditPost
    )
    .put(
        '/posts/:idPost',
        verify.isSignIn,
        verify.isAdmin,
        postController.updatePost
    )
    .delete(
        '/posts/:idPost',
        verify.isSignIn,
        verify.isAdmin,
        postController.deletePost
    );

router
    .get('/newpost', verify.isSignIn, newPostController.renderNewPostPage)
    .post(
        '/newpost/image',
        verify.isSignIn,
        upload.single('imageUpload'),
        newPostController.uploadImg
    )
    .post('/newpost', verify.isSignIn, newPostController.savePost);

router.get('/categories', verify.isSignIn, category.renderCategory);

router
    .get('/tags', verify.isSignIn, verify.isAdmin, tagController.renderTagPage)
    .post('/tags', verify.isSignIn, verify.isAdmin, tagController.addNewTag)
    .get('/tags/:id', verify.isSignIn, verify.isAdmin, tagController.editTag)
    .put('/tags/:id', verify.isSignIn, verify.isAdmin, tagController.updateTag)
    .delete(
        '/tags/:id',
        verify.isSignIn,
        verify.isAdmin,
        tagController.deleteTask
    );

module.exports = router;
