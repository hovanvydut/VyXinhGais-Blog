// check if user is logged in, if not then redirect to site login
const isSignIn = function(req, res, next) {
    if (req.session.user) {
        return next();
    }
    return res.redirect('/admin/accounts/signin');
};

// check if user is logged in and user's email is actived,
// if not then redirect to site home(/admin).
// In site home, show message and link to resend active mail
const isSignInAndActiveEmail = function(req, res, next) {
    if (req.session.user && req.session.user.is_active_email === 1) {
        return next();
    }
    return res.redirect('/admin');
};

// check if user is logged in, and if so, redirect to homepage(/admin)
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
    isSignInAndActiveEmail,
};
