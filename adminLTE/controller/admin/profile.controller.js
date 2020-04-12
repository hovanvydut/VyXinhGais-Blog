const fs = require('fs');
const cloudinary = require('./../../common/cloudinary.config');
const knex = require('../../database/connection');
const { DBError } = require('../../common/customErr');

const renderProfile = async (req, res, next) => {
    const { user } = req.session;
    const { userID } = req.params;
    const message = req.flash('message')[0];

    if (user.id === userID || user.role === 'admin') {
        let userNeedView;
        try {
            userNeedView = await knex('users')
                .select()
                .where({ id: userID })
                .first();
        } catch (err) {
            return next(new DBError(err.message));
        }

        return res.render('admin/pages/profile', {
            title: 'Profile',
            breadscrumb: [
                { content: 'home', href: '/admin' },
                { content: 'profile', href: '/admin/profile' },
            ],
            user,
            userNeedView,
            message,
        });
    }

    req.flash('blankMessage', 'Dont allow access infomation of other users');
    return res.redirect('/admin/blank-message');
};

const renderEditProfile = async (req, res, next) => {
    const { user } = req.session;
    const { userID } = req.params;
    if (user.id === userID || user.role === 'admin') {
        let userNeedView;
        try {
            userNeedView = await knex('users')
                .select()
                .where({ id: userID })
                .first();
        } catch (err) {
            return next(new DBError(err.message));
        }

        return res.render('admin/pages/editProfile', {
            title: 'Profile',
            breadscrumb: [
                { content: 'Home', href: '/admin' },
                { content: 'Profile', href: '/admin/profile' },
                { content: 'Edit profile', href: '/admin/profile/edit' },
            ],
            user,
            userNeedView,
        });
    }

    req.flash(
        'blankMessage',
        'Dont allow access edit infomation of other users'
    );
    return res.redirect('/admin/blank-message');
};

const updateInfo = async (req, res, next) => {
    const { userID } = req.params;
    const { path } = req.file;
    let imageAfterUpload;

    try {
        imageAfterUpload = await cloudinary.uploader.upload(path, {
            tags: 'avatar',
            folder: 'VyXinhGais-Blog/avatar',
        });

        await knex('users')
            .where({ id: userID })
            .update({
                avatar: imageAfterUpload.url,
            });

        console.log(`* ${imageAfterUpload.url}`);
        fs.unlinkSync(path);

        req.flash('message', {
            status: 'success',
            name: 'Update your profile successfully!',
        });
        return res.redirect(`/admin/profile/${userID}`);
    } catch (err) {
        return next(new Error(err.message));
    }
};

module.exports = { renderProfile, renderEditProfile, updateInfo };
