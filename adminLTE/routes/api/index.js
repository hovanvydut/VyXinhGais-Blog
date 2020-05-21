const express = require('express');

const router = express.Router();
const postControl = require('./../../controller/api/post.api.control');
const tagControl = require('./../../controller/api/tag.api.control');
const categoryControl = require('./../../controller/api/category.api.control');
const popularArticleControl = require('./../../controller/api/popularArticle.api.control');
const authControl = require('./../../controller/api/auth.api.control');
const commentControl = require('./../../controller/api/comment.api.control');

router.get('/thumb-posts', postControl.getThumbPost);

// api/v1/search?postName=abcxyz
router.get('/search', postControl.searchPost);
/** /api/v1/
 * GET /posts/:postId/comments
 * POST /posts/:postId/comment
 * POST /posts/:postId/comment/:commentId/reply
 */
router.get('/tests', (req, res) => res.json('test'));
router
    .post('/posts/:postId/comment', commentControl.commentInPost)
    .get('/posts/:postId/comments', commentControl.getAllComments)
    .get('/posts/:linkPost', postControl.getPost)
    .post('/posts/comment/:commentId/reply', commentControl.replyComment)
    .get('/posts/comment/:commentId/reply', commentControl.getAllReplyComment);

router.get('/tags', tagControl.getAllTags);
router.get('/tag/:tagName', tagControl.filterPostByTag);

router.get('/categories', categoryControl.getAllCategories);
router.get('/category/:linkCategory', categoryControl.filterPostByCategory);

router.get('/popular-article', popularArticleControl.getAllPopularArticle);

router
    .post('/login', authControl.handleLogin)
    .post('/signup', authControl.handleSignup);

module.exports = router;
