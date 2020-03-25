const knex = require('../../database/connection');

const renderProfile = (req, res) => {
    const { user } = req.session;
    const { userID } = req.params;
    console.log(user);
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
    req.flash('myMessage', 'Ko duoc truy cap id cua nguoi khac');
    return res.redirect('/admin/error');
};

module.exports = { renderProfile };
