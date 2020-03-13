const isSignIn = function(req, res, next) {
    console.log(req.session);
    console.log(req.session.cookie.maxAge);
    // console.log(req.session.user);

    if (req.session.user) {
        return next();
    }

    req.session.destroy((err) => {
        console.log(err);
        console.log('destroy');
        return res.redirect('/accounts/signin');
    });
};

const signedIn = function(req, res, next) {
    if (req.session.user) {
        return res.redirect('/');
    }
    return next();
};

module.exports = {
    isSignIn,
    signedIn,
};
