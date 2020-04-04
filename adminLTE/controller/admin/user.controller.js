const bcrypt = require('bcryptjs');
const knex = require('../../database/connection');
const { DBError } = require('./../../common/customErr');

const renderUserPage = async (req, res) => {
    const { user } = req.session;
    const message = req.flash('message')[0];

    const userList = await knex('users').select();

    return res.render('admin/pages/user', {
        title: 'Quan li user',
        breadscrumb: [
            { content: 'home', href: '/admin' },
            { content: 'users', href: '/admin/users' },
        ],
        user,
        userList,
        message,
    });
};

const renderEditUser = async (req, res, next) => {
    let error = req.flash('error');
    let userSubmit = req.flash('userSubmit');
    if (error) {
        // eslint-disable-next-line
        error = error[0];
        // eslint-disable-next-line
        userSubmit = userSubmit[0];
    }

    const { user } = req.session;
    const { userID } = req.params;
    let userNeedEdit;
    try {
        userNeedEdit = await knex('users')
            .select()
            .where({ id: userID })
            .first();
    } catch (err) {
        return next(new DBError(err.message));
    }

    return res.render('admin/pages/editUser', {
        title: 'Edit user',
        breadscrumb: [
            { content: 'users', href: '/admin/users' },
            { content: 'edit user', href: '/admin/users' },
        ],
        user,
        userNeedEdit,
        error,
        userSubmit,
    });
};

const updateUser = async (req, res, next) => {
    // ? user is admin
    const { user } = req.session;

    // ? userID: id of user need update(except admin);
    const { userID } = req.params;
    const { error, userSubmit } = res.locals;
    const { name, email, resetPassword, role } = userSubmit;
    let oldPassword = user.password;

    if (userID === user.id) {
        req.flash('blankMessage', 'Admin dont allow modify any yourself');
        return res.redirect('/admin/blank-message');
    }

    if (error.status === 'hasError') {
        req.flash('error', error);
        req.flash('userSubmit', userSubmit);
        return res.redirect(`/admin/users/${userID}`);
    }

    // ? if set new passwowd, then update oldPassword into new password;
    if (error.setNewPassword) {
        console.log(resetPassword);
        const salt = bcrypt.genSaltSync(10);
        oldPassword = bcrypt.hashSync(resetPassword, salt);
    }

    try {
        await Promise.all([
            knex('users')
                .where({ id: userID })
                .update({
                    name,
                    email,
                    password: oldPassword,
                    role,
                }),
            knex('sessions')
                .where('data', 'like', `%${userID}%`)
                .del(),
        ]);
    } catch (err) {
        return next(new DBError(err.message));
    }

    req.flash('message', {
        status: 'success',
        name: 'Update user successfully!',
    });
    return res.redirect('/admin/users');
};

const deleteUser = async (req, res, next) => {
    // ? user is admin
    const { user } = req.session;
    // ? userID: id of user need delete(except admin);
    const { userID } = req.params;

    if (user.id !== userID) {
        try {
            await Promise.all(
                knex('users')
                    .where({ id: userID })
                    .del(),
                // ? delete all session relative with userID
                knex('sessions')
                    .where('data', 'like', `%${userID}%`)
                    .del()
            );
        } catch (err) {
            return next(new DBError(err.message));
        }

        req.flash('message', {
            status: 'success',
            name: 'Delete user successfully!',
        });
        return res.redirect('/admin/users');
    }

    req.flash('blankMessage', 'You dont allow destroy yourself');
    return res.redirect('/admin/blank-message');
};

module.exports = {
    renderUserPage,
    deleteUser,
    renderEditUser,
    updateUser,
};
