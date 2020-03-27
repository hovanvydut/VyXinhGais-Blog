const knex = require('../../database/connection');
const { DBError } = require('../../common/customErr');

const renderProfile = (req, res) => {
    const { user } = req.session;
    const { userID } = req.params;

    if (user.id === userID) {
        return res.render('admin/pages/profile', {
            title: 'Profile',
            breadscrumb: [
                { content: 'home', href: '/admin' },
                { content: 'profile', href: '/admin/profile' },
            ],
            user,
        });
    }

    req.flash('blankMessage', 'Dont allow access infomation of other users');
    return res.redirect('/admin/blank-message');
};

module.exports = { renderProfile };
