const jwt = require('jsonwebtoken');
const knex = require('../../database/connection');
const generateId = require('./../../common/generateId');

const commentInPost = async (req, res) => {
    const { postId } = req.params;
    const { content, userId } = req.body;
    let decoded;
    console.log('here');
    try {
        decoded = jwt.verify(
            req.headers.authorization.split(' ')[1],
            process.env.JWT_SECRET_KEY
        );
    } catch (e) {
        return res.status(403).json('invalid token');
    }

    try {
        const id = generateId();
        await knex('comments').insert({
            id,
            content,
            post_id: postId,
            user_id: userId,
        });
        return res.status(201).json({ id });
    } catch (e) {
        return res.status(403).json(e.message);
    }
};

const getAllComments = async (req, res) => {
    const { postId } = req.params;
    try {
        const data = await knex('comments')
            .select(
                'comments.id',
                'comments.content',
                'comments.post_id',
                'comments.user_id',
                'comments.created_at',
                'users.name',
                'users.avatar'
            )
            .where('comments.post_id', '=', postId)
            .innerJoin('users', 'users.id', 'comments.user_id')
            .leftJoin(
                'reply_comment',
                'reply_comment.comment_id',
                '=',
                'comments.id'
            )
            .groupBy('comments.id')
            .count('reply_comment.comment_id as countReplyComment')
            .orderBy('comments.created_at', 'desc');
        return res.status(200).json(data);
    } catch (e) {
        return res.status(403).json(e.message);
    }
};

const replyComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId, content } = req.body;
    try {
        const id = generateId();
        await knex('reply_comment').insert({
            id,
            content,
            comment_id: commentId,
            user_id: userId,
        });
        return res.status(201).json({ id });
    } catch (e) {
        return res.status(403).json(e.message);
    }
};

const getAllReplyComment = async (req, res) => {
    const { postId, commentId } = req.params;
    try {
        const data = await knex('reply_comment')
            .select(
                'reply_comment.id',
                'reply_comment.content',
                'reply_comment.created_at',
                'users.id',
                'users.name',
                'users.avatar'
            )
            .where({ comment_id: commentId })
            .innerJoin('users', 'users.id', '=', 'reply_comment.user_id')
            .orderBy('reply_comment.created_at', 'asc');
        return res.status(200).json(data);
    } catch (e) {
        return res.status(403).json(e.message);
    }
};

const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    let decoded;

    try {
        decoded = jwt.verify(
            req.headers.authorization.split(' ')[1],
            process.env.JWT_SECRET_KEY
        );
    } catch (e) {
        return res.status(403).json('invalid token');
    }

    try {
        await knex('comments')
            .where({ id: commentId, user_id: decoded.id })
            .del();
    } catch (e) {
        return res
            .status(409)
            .json("You dont allow delete another user's comment");
    }
};

module.exports = {
    commentInPost,
    getAllComments,
    replyComment,
    getAllReplyComment,
    deleteComment,
};
