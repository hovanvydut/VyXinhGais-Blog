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

module.exports = {
    isSignIn,
    signedIn,
};
