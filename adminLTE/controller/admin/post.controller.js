const speakingUrl = require('speakingurl');
const fs = require('fs');
const knex = require('../../database/connection');
const generateId = require('../../common/generateId');
const { DBError } = require('../../common/customErr');
const config = require('./../../common/config');
const cloudinary = require('./../../common/cloudinary.config');

const renderPostPage = async (req, res, next) => {
    const { user } = req.session;
    const message = req.flash('message')[0];
    let data;
    let condition = { 'posts.author': user.id };
    if (user.role === 'admin') {
        condition = {};
    }
    try {
        data = await knex('posts')
            .innerJoin('users', 'posts.author', '=', 'users.id')
            .innerJoin('categories', 'posts.category', '=', 'categories.id')
            .select(
                'posts.id',
                'posts.title',
                'posts.imgThumb',
                'users.name as author',
                'users.id as author_id',
                'categories.name as category_name',
                'posts.created_at'
            )
            .where(condition)
            .limit(10)
            .offset(0);
    } catch (err) {
        return next(new DBError(err.message));
    }

    return res.render('admin/pages/post', {
        title: 'Danh sách tất cả các bài viết',
        breadscrumb: [
            { content: 'Home', href: '/admin' },
            { content: 'Posts', href: '#' },
        ],
        user,
        data,
        message,
    });
};

const renderEditPost = async (req, res, next) => {
    const { user } = req.session;
    const { idPost } = req.params;
    let post;
    let tags;
    let postTags;
    let categories;

    try {
        [post, tags, categories] = await Promise.all([
            await knex('posts')
                .select()
                .where({ id: idPost })
                .first(),
            await knex('tags').select(),
            await knex('categories').select(),
        ]);

        postTags = await knex('post_tags')
            .select()
            .where({ post_id: post.id });
    } catch (err) {
        return next(new DBError(err.message));
    }

    if (user.role !== 'admin' && post.author !== user.id) {
        req.flash('blankMessage', 'You dont allow to edit this post');
        return res.redirect('/admin/blank-message');
    }

    return res.render('admin/pages/editPost', {
        title: 'Edit post',
        breadscrumb: [
            { content: 'Home', href: '/admin' },
            { content: 'Posts', href: '/admin/posts' },
            { content: 'Edit post', href: '#' },
        ],
        user,
        tags,
        post,
        postTags,
        categories,
        tinyAPIKey: process.env.TINY_API_KEY,
    });
};

const updatePost = async (req, res, next) => {
    const currentUser = req.session.user;

    const { idPost } = req.params;
    const { title, content, tags, description, category } = req.body;
    const linkPost = `${speakingUrl(title)}-${generateId(1)}`;

    /* // ? old method
    let path;
    let imgThumb;
    try {
        path = req.file.path
            .split('\\')
            .slice(1)
            .join('/');
        imgThumb = `${process.env.HOST}/static/${path}`;
        imgThumb = imgThumb.replace(/(?<!:)\/+(?=\/(?=))/g, '');
    } catch (err) {
        imgThumb = config.defaultPostThumb();
    } */

    // ! start: replace method old upload method by cloudinary upload
    let oldPost;
    try {
        oldPost = await knex('posts')
            .select()
            .where({ id: idPost })
            .first();
    } catch (err) {
        return next(new DBError(err.message));
    }
    if (currentUser.role !== 'admin' && oldPost.author !== currentUser.id) {
        req.flash('blankMessage', 'You dont allow to edit this post');
        return res.redirect('/admin/blank-message');
    }

    let { imgThumb } = oldPost;
    if (req.file) {
        try {
            const uploadedImg = await cloudinary.uploader.upload(
                req.file.path,
                {
                    tags: 'thumbnail',
                    folder: 'VyXinhGais-Blog/thumbnail',
                }
            );
            console.log('* ', uploadedImg.url);
            imgThumb = uploadedImg.url;

            const tmp = oldPost.imgThumb.match(
                /VyXinhGais-Blog\/thumbnail\/\w+/
            );
            const oldPulicId = tmp ? tmp[0] : 'error';

            cloudinary.uploader
                .destroy(oldPulicId, {
                    invalidate: true,
                })
                .catch((err) => console.log(err));
            fs.unlinkSync(req.file.path);
        } catch (err) {
            console.log(err);
        }
    }

    // ! end: replace method old upload method by cloudinary upload

    /*     if (category !== oldPost.category) {
        await Promise.all([
            knex('categories')
                .where({ id: category })
                .increment('countPost', 1),
            knex('categories')
                .where({ id: oldPost.category })
                .whereNot('countPost', 0)
                .decrement('countPost', 1),
        ]).catch((e) => console.log(e));
    } */

    await Promise.all([
        knex('posts')
            .where({ id: idPost })
            .update({
                title,
                content: content.replace(
                    new RegExp('(../)?..(?=/static/uploads)', 'g'),
                    process.env.HOST.slice(0, -1)
                ),
                linkPost,
                description,
                category,
                imgThumb,
            }),
        // ? delete all old tags
        knex('post_tags')
            .where({ post_id: idPost })
            .del(),
    ]).catch((e) => console.log(e));

    // ? if tags = array => typeof array === "object"; this help avoid tags = undefined
    let temp = [];
    if (typeof tags === 'object') {
        temp = tags;
    } else if (typeof tags === 'string') {
        temp.push(tags);
    }

    await Promise.all(
        temp.map((tagId) =>
            knex('post_tags').insert({
                id: generateId(),
                post_id: idPost,
                tag_id: tagId,
            })
        )
    ).catch((e) => console.log(e));

    req.flash('message', {
        status: 'success',
        name: 'Update post successfully!',
    });
    return res.redirect('/admin/posts');
};

const deletePost = async (req, res, next) => {
    const { idPost } = req.params;
    const { user } = req.session;

    try {
        if (user.role === 'admin') {
            await knex('posts')
                .where({ id: idPost })
                .del();
        } else {
            await knex('posts')
                .where({ id: idPost, author: user.id })
                .del();
        }
    } catch (err) {
        req.flash('blankMessage', 'You dont allow to delete this post');
        return res.redirect('/admin/blank-message');
    }

    req.flash('message', {
        status: 'success',
        name: 'Delete post successfully!',
    });
    return res.redirect('/admin/posts');
};

const renderMyPost = async (req, res, next) => {
    const { user } = req.session;
    const message = req.flash('message')[0];
    let data;

    try {
        data = await knex('posts')
            .where({ author: user.id })
            .limit(10)
            .offset(0);
        data.forEach((row) => {
            // eslint-disable-next-line
            row.author = user.name;
            // eslint-disable-next-line
            row.author_id = user.id;
        });

        return res.render('admin/pages/post', {
            title: 'Danh sách tất cả các bài viết',
            breadscrumb: [
                { content: 'Home', href: '/admin' },
                { content: 'My posts', href: '#' },
            ],
            user,
            data,
            message,
        });
    } catch (err) {
        return next(new DBError(err.message));
    }
};

module.exports = {
    renderPostPage,
    renderEditPost,
    deletePost,
    updatePost,
    renderMyPost,
};
