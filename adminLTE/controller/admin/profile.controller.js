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
                { content: 'Home', href: '/admin' },
                { content: 'Profile', href: '/admin/profile' },
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

    if (!req.file) {
        req.flash('blankMessage', 'Please select imate to update');
        return res.redirect('/admin/blank-message');
    }

    const { path } = req.file;

    if (user.id !== userID && user.role !== 'admin') {
        req.flash(
            'blankMessage',
            'Dont allow access edit infomation of other users'
        );
        return res.redirect('/admin/blank-message');
    }

    try {
        const [uploadedImg, oldDataOfUser] = await Promise.all([
            // ? upload image in local to cloudinary
            await cloudinary.uploader.upload(path, {
                tags: 'avatar',
                folder: 'VyXinhGais-Blog/avatar',
            }), // ? delete old-avatar in cloud
            await knex('users')
                .select()
                .where({ id: userID })
                .first(),
        ]);

        const tmp = oldDataOfUser.avatar.match(/VyXinhGais-Blog\/avatar\/\w+/);
        const oldPulicId = tmp && tmp.length > 0 ? tmp[0] : 'error';

        cloudinary.uploader.destroy(oldPulicId, {
            invalidate: true,
        });
        // delete image on local
        fs.unlink(path, (err) => {
            if (err) console.log(err);
            else {
                console.log('* Delete local file successfully!');
            }
        });

        // ? update new avatar
        await knex('users')
            .where({ id: userID })
            .update({
                avatar: uploadedImg.url,
            });

        console.log(`* ${uploadedImg.public_id}`);
        console.log(`* ${uploadedImg.url}`);

        // update session
        if (req.session.user.id === userID) {
            req.session.user.avatar = uploadedImg.url;
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
