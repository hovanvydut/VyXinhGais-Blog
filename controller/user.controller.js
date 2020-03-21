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
    });
};

const updateUser = async (req, res) => {
    const { user } = req.session;
    const { userID } = req.params;
    console.log(req.body);
    // await knex('users')
    //     .where({ id: userID })
    //     .update();

    // req.flash('updateSuccess', 'Cập nhật thành công');
    // return res.redirect('/admin/users');
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
