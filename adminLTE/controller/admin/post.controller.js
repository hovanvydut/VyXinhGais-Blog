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

    try {
        data = await knex('posts')
            .innerJoin('users', 'posts.author', '=', 'users.id')
            .innerJoin('categories', 'posts.category', '=', 'categories.id')
            .select(
                'posts.id',
                'posts.title',
                'posts.imgThumb',
                knex.ref('users.name').as('author'),
                knex.ref('users.id').as('author_id'),
                knex.ref('categories.name').as('category_name'),
                'posts.created_at'
            )
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
    const oldPost = await knex('posts')
        .select()
        .where({ id: idPost })
        .first();

    let { imgThumb } = oldPost;
    try {
        const uploadedImg = await cloudinary.uploader.upload(req.file.path, {
            tags: 'thumbnail',
            folder: 'VyXinhGais-Blog/thumbnail',
        });
        console.log('* ', uploadedImg.url);
        imgThumb = uploadedImg.url;

        const tmp = oldPost.imgThumb.match(/VyXinhGais-Blog\/thumbnail\/\w+/);
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
    // ! end: replace method old upload method by cloudinary upload

    try {
        if (category !== oldPost.category) {
            await Promise.all([
                knex('categories')
                    .where({ id: category })
                    .increment('countPost', 1),
                knex('categories')
                    .where({ id: oldPost.category })
                    .whereNot('countPost', 0)
                    .decrement('countPost', 1),
            ]);
        }

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
        ]);

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
        );

        req.flash('message', {
            status: 'success',
            name: 'Update post successfully!',
        });
        return res.redirect('/admin/posts');
    } catch (err) {
        return next(new DBError(err.message));
    }
};

const deletePost = async (req, res, next) => {
    const { idPost } = req.params;

    try {
        await knex('posts')
            .where({ id: idPost })
            .del();
    } catch (err) {
        return next(new DBError(err.message));
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
