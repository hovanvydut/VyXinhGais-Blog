const isSignIn = function(req, res, next) {
    if (req.session.user) {
        return next();
    }
    return res.redirect('/admin/accounts/signin');
};

const signedIn = function(req, res, next) {
    if (req.session.user) {
        return res.redirect('/admin');
    }
    return next();
};

const isAdmin = (req, res, next) => {
    const { user } = req.session;
    if (user.role === 'admin') {
        next();
        return;
    }
    req.flash('myMessage', 'Bạn không có quyền truy cập vào chức năng này');
    return res.redirect('/admin/error');
};

module.exports = {
    isSignIn,
    signedIn,
    isAdmin,
};
