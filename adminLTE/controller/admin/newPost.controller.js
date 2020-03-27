const speakingUrl = require('speakingurl');
const knex = require('../../database/connection');
const generateId = require('../../common/generateId');
const { DBError } = require('../../common/customErr');

const renderNewPostPage = async (req, res, next) => {
    const { user } = req.session;
    let tags;

    try {
        tags = await knex('tags').select();
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
    });
};

const savePost = async (req, res, next) => {
    const { user } = req.session;
    const { title, content, tags, description } = req.body;
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
            imgThumb: 'link img thumb',
        });
    } catch (err) {
        return next(new DBError(err.message));
    }

    let temp = [];
    if (typeof tags !== 'object') {
        temp.push(tags);
    } else {
        temp = tags;
    }
    temp.forEach(async (tagId) => {
        try {
            await knex('post_tags').insert({
                id: generateId(),
                post_id: idPost,
                tag_id: tagId,
            });
        } catch (err) {
            return next(new DBError(err.message));
        }
    });

    return res.redirect('/admin/posts');
};

const uploadImg = function(req, res) {
    const path = req.file.path
        .split('\\')
        .slice(1)
        .join('/');
    let imgPath = `${process.env.HOST}/static/${path}`;
    imgPath = imgPath.replace(/(?<!:)\/+(?=\/(?=))/g, '');

    // send img path to tinyMCE
    return res.status(200).json({
        location: imgPath,
    });
};

module.exports = {
    renderNewPostPage,
    uploadImg,
    savePost,
};
