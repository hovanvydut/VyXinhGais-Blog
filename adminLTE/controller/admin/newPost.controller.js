const speakingUrl = require('speakingurl');
const fs = require('fs');
const knex = require('../../database/connection');
const generateId = require('../../common/generateId');
const cloudinary = require('./../../common/cloudinary.config');
const { DBError } = require('../../common/customErr');
const config = require('./../../common/config');

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
            { content: 'Home', href: '/admin' },
            { content: 'Write new post', href: '#' },
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
    const linkPost = `${speakingUrl(title)}-${generateId(1)}`;

    if (!category) {
        req.flash(
            'blankMessage',
            'Categories is empty! Admin, please create a new category '
        );
        return res.redirect('/admin/blank-message');
    }

    if (!tags) {
        req.flash(
            'blankMessage',
            'Categories is empty! Admin, please create a new tag '
        );
        return res.redirect('/admin/blank-message');
    }

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
    }
    */

    // ! start: replace method old upload method by cloudinary upload
    let imgThumb;
    try {
        const uploadedImg = await cloudinary.uploader.upload(req.file.path, {
            tags: 'thumbnail',
            folder: 'VyXinhGais-Blog/thumbnail',
        });
        imgThumb = uploadedImg.url;
        fs.unlinkSync(req.file.path);
    } catch (err) {
        imgThumb = config.defaultPostThumb();
    }
    // ! end: replace method old upload method by cloudinary upload

    try {
        const removeDoubleDotAtSrcAttrImg = /\.\.(?=\/+static)/g;

        await knex('posts').insert({
            id: idPost,
            title,
            content: content.replace(
                removeDoubleDotAtSrcAttrImg,
                process.env.HOST.slice(0, -1)
            ),
            author: user.id,
            linkPost,
            description,
            category,
            imgThumb,
        });

        await knex('categories')
            .where({ id: category })
            .increment('countPost', 1);

        let temp = [];
        if (typeof tags === 'object') {
            temp = tags;
        } else if (typeof tags === 'string') {
            temp.push(tags);
        }

        // ? one `posts` have many `tags`
        await Promise.all(
            temp.map((tagId) =>
                knex('post_tags').insert({
                    id: generateId(),
                    post_id: idPost,
                    tag_id: tagId,
                })
            )
        );

        // ? update `tags`.`countPost` = `countPost` + 1
        await Promise.all(
            temp.map((tagId) =>
                knex('tags')
                    .where({ id: tagId })
                    .increment('countPost', 1)
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

const uploadImg = async function(req, res) {
    /* // ? old method
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
    */

    // ! start: replace method old upload method by cloudinary upload
    let uploadedImg;
    try {
        uploadedImg = await cloudinary.uploader.upload(req.file.path, {
            tags: 'ImgForPost',
            folder: 'VyXinhGais-Blog/ImgForPost',
        });
        fs.unlinkSync(req.file.path);
    } catch (err) {
        return res
            .status(404)
            .json('Error occurred when upload image to cloud');
    }

    // ? send img path to tinyMCE
    return res.status(200).json({
        location: uploadedImg.url,
    });
    // ! end: replace method old upload method by cloudinary upload
};

module.exports = {
    renderNewPostPage,
    uploadImg,
    savePost,
};
