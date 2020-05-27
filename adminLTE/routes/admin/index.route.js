const express = require('express');
const multer = require('multer');

const router = express.Router();
const multerConfig = require('./../../common/multer.config');

const storage = multer.diskStorage(multerConfig.storage('public/uploads'));
const upload = multer({ storage });

const verify = require('../../middleware/verify');
const validate = require('../../middleware/validation');
const imageMin = require('./../../middleware/imageMin.middle');

const homeController = require('../../controller/admin/home.controller');
const userController = require('../../controller/admin/user.controller');
const postController = require('../../controller/admin/post.controller');
const newPostController = require('../../controller/admin/newPost.controller');
const category = require('../../controller/admin/category.controller');
const tagController = require('../../controller/admin/tag.controller');
const profileController = require('../../controller/admin/profile.controller');

router
    .get('/', verify.isSignIn, homeController.renderHomePage)
    .get('/blank-message', homeController.blankMessage);

router
    .get(
        '/users',
        verify.isSignInAndActiveEmail,
        verify.isAdmin,
        userController.renderUserPage
    )
    .get(
        '/users/:userID',
        verify.isSignInAndActiveEmail,
        verify.isAdmin,
        userController.renderEditUser
    )
    .put(
        '/users/:userID',
        verify.isSignInAndActiveEmail,
        verify.isAdmin,
        validate.updateUser,
        userController.updateUser
    )
    .delete(
        '/users/:userID',
        verify.isSignInAndActiveEmail,
        verify.isAdmin,
        userController.deleteUser
    );

router
    .get(
        '/profile/edit/:userID',
        verify.isSignInAndActiveEmail,
        profileController.renderEditProfile
    )
    .post(
        '/profile/edit/:userID',
        verify.isSignInAndActiveEmail,
        upload.single('avatar'),
        imageMin,
        profileController.updateInfo
    )
    .get('/profile/:userID', verify.isSignIn, profileController.renderProfile);

router
    .get('/posts', verify.isSignInAndActiveEmail, postController.renderPostPage)
    .get(
        '/posts/:idPost',
        verify.isSignInAndActiveEmail,
        postController.renderEditPost
    )
    .post(
        '/posts/:idPost',
        verify.isSignInAndActiveEmail,
        upload.single('imgThumb'),
        imageMin,
        postController.updatePost
    )
    .delete(
        '/posts/:idPost',
        verify.isSignInAndActiveEmail,
        postController.deletePost
    )
    .get('/my-posts', postController.renderMyPost);

router
    .get(
        '/newpost',
        verify.isSignInAndActiveEmail,
        newPostController.renderNewPostPage
    )
    // ? method help upload thumbnail from tinyMCE editor
    .post(
        '/newpost/image',
        verify.isSignInAndActiveEmail,
        upload.single('imageUpload'),
        imageMin,
        newPostController.uploadImg
    )
    .post(
        '/newpost',
        verify.isSignInAndActiveEmail,
        upload.single('imgThumb'),
        imageMin,
        newPostController.savePost
    );

router
    .get('/categories', verify.isSignInAndActiveEmail, category.renderCategory)
    .post(
        '/categories',
        verify.isSignInAndActiveEmail,
        category.createNewCategory
    )
    .get(
        '/categories/:linkCategory',
        verify.isSignInAndActiveEmail,
        category.renderEditCategory
    )
    .delete(
        '/categories/:idCategory',
        verify.isSignInAndActiveEmail,
        category.deleteCategory
    )
    .put(
        '/categories/:idCategory',
        verify.isSignInAndActiveEmail,
        category.updateCategory
    );

router
    .get(
        '/tags',
        verify.isSignInAndActiveEmail,
        verify.isAdmin,
        tagController.renderTagPage
    )
    .post(
        '/tags',
        verify.isSignInAndActiveEmail,
        verify.isAdmin,
        tagController.addNewTag
    )
    .get(
        '/tags/:id',
        verify.isSignInAndActiveEmail,
        verify.isAdmin,
        tagController.editTag
    )
    .put(
        '/tags/:id',
        verify.isSignInAndActiveEmail,
        verify.isAdmin,
        tagController.updateTag
    )
    .delete(
        '/tags/:id',
        verify.isSignInAndActiveEmail,
        verify.isAdmin,
        tagController.deleteTask
    );

module.exports = router;
