const speakingUrl = require('speakingurl');
const knex = require('../../database/connection');
const generateId = require('../../common/generateId');
const { DBError } = require('../../common/customErr');

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
            { content: 'hihi', href: '/abc' },
            { content: 'haha', href: '#' },
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
            { content: 'danh sách bài viết', href: '/post' },
            { content: 'bài viết mới', href: '#' },
        ],
        user,
        tags,
        post,
        postTags,
        categories,
    });
};

const updatePost = async (req, res, next) => {
    const { idPost } = req.params;
    const { title, content, tags, description, category } = req.body;
    const linkPost = `${speakingUrl(title)}-${idPost}`;

    try {
        await Promise.all([
            knex('posts')
                .where({ id: idPost })
                .update({
                    title,
                    content: content.replace(
                        new RegExp('(../)?..(?=/static/uploads)', 'g'),
                        ''
                    ),
                    linkPost,
                    description,
                    category,
                    imgThumb: 'link img thumb',
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
                { content: 'hihi', href: '/abc' },
                { content: 'haha', href: '#' },
            ],
            user,
            data,
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
