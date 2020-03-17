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

router.use(verify.isSignIn);

router.get('/', homeController.renderHomePage);

router.get('/posts', postController.renderPostPage);

router.get('/newpost', newPostController.renderNewPostPage);
router.post(
    '/newpost/image',
    upload.single('imageUpload'),
    newPostController.uploadImg
);
router.post('/newpost', newPostController.savePost);

router.get('/tags', tagController.renderTagPage);
router.post('/tags', tagController.addNewTag);
router.get('/tags/:id', tagController.editTag);

router.put('/tags/:id', tagController.updateTag);

router.delete('/tags/:id', tagController.deleteTask);

module.exports = router;
