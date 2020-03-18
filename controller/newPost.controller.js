const knex = require('./../database/connection');
const generateId = require('./../common/generateId');

const domain = 'admin';

const renderNewPostPage = async (req, res) => {
    const { user } = req.session;
    const tags = await knex('tags').select();
    res.render(`${domain}/pages/newPost`, {
        title: 'Viết bài',
        breadscrumb: [
            { content: 'danh sách bài viết', href: '/post' },
            { content: 'bài viết mới', href: '#' },
        ],
        user,
        tags,
    });
};

const savePost = async (req, res) => {
    const { user } = req.session;
    console.log(req.body);
    const { title, content, tags, description } = req.body;
    const idPost = generateId();
    const linkPost = `/admin/posts/${title
        .trim()
        .replace(/\s(?=\s)/g, '')
        .replace(/\s/g, '-')}${generateId(1)}`;

    await knex('posts').insert({
        id: idPost,
        title,
        content,
        author: user.id,
        linkPost,
        description,
        imgThumb: 'link img thumb',
    });

    JSON.parse(tags).forEach(async (tagId) => {
        await knex('post_tags').insert({
            id: generateId(),
            post_id: idPost,
            tag_id: tagId,
        });
    });

    return res.status(200).json({ linkPost });
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
