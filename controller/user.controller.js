const bcrypt = require('bcryptjs');
const knex = require('../database/connection');

const renderUserPage = async (req, res) => {
    const { user } = req.session;
    const userList = await knex('users').select();
    return res.render('admin/pages/user', {
        title: 'Quan li user',
        breadscrumb: [
            { content: 'home', href: '/admin' },
            { content: 'users', href: '/admin/users' },
        ],
        user,
        userList,
    });
};

const renderEditUser = async (req, res) => {
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

    const userNeedEdit = await knex('users')
        .select()
        .where({ id: userID })
        .first();

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

const updateUser = async (req, res) => {
    const { user } = req.session;
    const { userID } = req.params;
    const { error, userSubmit } = res.locals;
    const { name, email, resetPassword, role } = userSubmit;
    let oldPassword = user.password;

    if (error.status === 'hasError') {
        req.flash('error', error);
        req.flash('userSubmit', userSubmit);
        return res.redirect(`/admin/users/${userID}`);
    }

    if (error.setNewPassword) {
        console.log(resetPassword);
        const salt = bcrypt.genSaltSync(10);
        oldPassword = bcrypt.hashSync(resetPassword, salt);
    }

    await knex('users')
        .where({ id: userID })
        .update({
            name,
            email,
            password: oldPassword,
            role,
        });
    req.flash('updateSuccess', 'Cập nhật thành công');
    return res.redirect('/admin/users');
};

const deleteUser = async (req, res) => {
    const { user } = req.session;
    const { userID } = req.params;

    if (user.id !== userID) {
        await knex('users')
            .where({ id: userID })
            .del();

        req.flash('deleteSuccess', 'Xoá thành công');
        return res.redirect('/admin/users');
    }

    req.flash('myMessage', 'Bạn không được phép xoá chính bạn');
    return res.redirect('/admin/error');
};

module.exports = {
    renderUserPage,
    deleteUser,
    renderEditUser,
    updateUser,
};
