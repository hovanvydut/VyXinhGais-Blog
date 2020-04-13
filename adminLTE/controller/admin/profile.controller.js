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
    const { user } = req.session;
    const { userID } = req.params;
    const { path } = req.file;
    let imageAfterUpload;
    console.log(`userID: ${userID}`);
    if (user.id !== userID && user.role !== 'admin') {
        req.flash(
            'blankMessage',
            'Dont allow access edit infomation of other users'
        );
        return res.redirect('/admin/blank-message');
    }

    try {
        // ? upload image in local to cloudinary
        imageAfterUpload = await cloudinary.uploader.upload(path, {
            tags: 'avatar',
            folder: 'VyXinhGais-Blog/avatar',
        });

        // ? delete old-avatar in cloud
        const oldDataOfUser = await knex('users')
            .select()
            .where({ id: userID })
            .first();
        const oldPulicId = oldDataOfUser.avatar.match(
            /VyXinhGais-Blog\/avatar\/\w+/
        )[0];
        console.log('oldPublicID: ', oldPulicId);
        const result = await cloudinary.uploader.destroy(oldPulicId, {
            invalidate: true,
        });
        console.log(result);

        // ? update new avatar and delete file in local
        await knex('users')
            .where({ id: userID })
            .update({
                avatar: imageAfterUpload.url,
            });
        fs.unlinkSync(path);

        console.log(`* ${imageAfterUpload.public_id}`);
        console.log(`* ${imageAfterUpload.url}`);
        if (req.session.user.id === userID) {
            req.session.user.avatar = imageAfterUpload.url;
        }

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
