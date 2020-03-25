const speakingUrl = require('speakingurl');
const knex = require('../../database/connection');
const generateId = require('../../common/generateId');

const renderPostPage = async (req, res) => {
    const { user } = req.session;
    const data = await knex.raw(
        'SELECT p.id ,p.title, u.name, p.created_at FROM `posts` as p INNER JOIN `users` as u on p.author = u.id'
    );
    res.render('admin/pages/post', {
        title: 'Danh sách tất cả các bài viết',
        breadscrumb: [
            { content: 'hihi', href: '/abc' },
            { content: 'haha', href: '#' },
        ],
        user,
        data: data[0],
    });
};

const renderEditPost = async (req, res) => {
    const { user } = req.session;
    const { idPost } = req.params;

    const data = await knex.raw(
        'SELECT * FROM `posts` as p WHERE p.id = ' + `"${idPost}"`
    );
    const post = data[0][0];

    const tags = await knex('tags').select();
    const postTags = await knex('post_tags')
        .select()
        .where({ post_id: post.id });

    res.render('admin/pages/editPost', {
        title: 'Edit post',
        breadscrumb: [
            { content: 'danh sách bài viết', href: '/post' },
            { content: 'bài viết mới', href: '#' },
        ],
        user,
        tags,
        post,
        postTags,
    });
};

const updatePost = async (req, res) => {
    const { idPost } = req.params;
    const { title, content, tags, description } = req.body;
    const linkPost = `${speakingUrl(title)}-${idPost}`;

    try {
        await knex('posts').update({
            id: idPost,
            title,
            content: content.replace(
                new RegExp('(../)?..(?=/static/uploads)', 'g'),
                ''
            ),
            linkPost,
            description,
            imgThumb: 'link img thumb',
        });

        await knex('post_tags')
            .where({ post_id: idPost })
            .del();

        let temp = [];
        if (typeof tags !== 'object') {
            temp.push(tags);
        } else {
            temp = tags;
        }
        temp.forEach(async (tagId) => {
            await knex('post_tags').insert({
                id: generateId(),
                post_id: idPost,
                tag_id: tagId,
            });
        });
        return res.redirect('/admin/posts');
    } catch (err) {
        req.flash('errorMessage', err);
        return res.redirect('/admin/error');
    }
};

const deletePost = async (req, res) => {
    const { idPost } = req.params;
    await knex('posts')
        .where({ id: idPost })
        .del();

    return res.redirect('/admin/posts');
};

module.exports = {
    renderPostPage,
    renderEditPost,
    deletePost,
    updatePost,
};
