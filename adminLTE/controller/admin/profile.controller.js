const knex = require('../../database/connection');
const { DBError } = require('../../common/customErr');

const renderProfile = async (req, res, next) => {
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

        return res.render('admin/pages/profile', {
            title: 'Profile',
            breadscrumb: [
                { content: 'home', href: '/admin' },
                { content: 'profile', href: '/admin/profile' },
            ],
            user,
            userNeedView,
        });
    }

    req.flash('blankMessage', 'Dont allow access infomation of other users');
    return res.redirect('/admin/blank-message');
};

module.exports = { renderProfile };
