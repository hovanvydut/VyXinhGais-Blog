const speakingUrl = require('speakingurl');
const knex = require('../../database/connection');
const generateId = require('../../common/generateId');
const { DBError } = require('../../common/customErr');

const renderNewPostPage = async (req, res, next) => {
    const { user } = req.session;
    let tags;
    let categories;

    try {
        tags = await knex('tags').select();
        categories = await knex('categories').select();
    } catch (err) {
        return next(new DBError(err.message));
    }

    res.render('admin/pages/newPost', {
        title: 'Viết bài',
        breadscrumb: [
            { content: 'danh sách bài viết', href: '/post' },
            { content: 'bài viết mới', href: '#' },
        ],
        user,
        tags,
        categories,
    });
};

const savePost = async (req, res, next) => {
    const { user } = req.session;
    const { title, content, tags, description, category } = req.body;
    const idPost = generateId();
    const linkPost = `${speakingUrl(title)}-${idPost}`;

    try {
        await knex('posts').insert({
            id: idPost,
            title,
            content: content.replace(/\.\.(?=\/+static)/g, ''),
            author: user.id,
            linkPost,
            description,
            category,
            imgThumb: 'link img thumb',
        });

        let temp = [];
        if (typeof tags !== 'object') {
            temp.push(tags);
        } else {
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
    } catch (err) {
        return next(new DBError(err.message));
    }

    req.flash('message', {
        status: 'success',
        name: 'Create new post successfully!',
    });
    if (user.role === 'customer') return res.redirect('/admin/my-posts');
    return res.redirect('/admin/posts');
};

const uploadImg = function(req, res) {
    const path = req.file.path
        .split('\\')
        .slice(1)
        .join('/');
    let imgPath = `${process.env.HOST}/static/${path}`;
    imgPath = imgPath.replace(/(?<!:)\/+(?=\/(?=))/g, '');

    // ? send img path to tinyMCE
    return res.status(200).json({
        location: imgPath,
    });
};

module.exports = {
    renderNewPostPage,
    uploadImg,
    savePost,
};
