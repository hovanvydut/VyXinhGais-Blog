const signIn = function(req, res, next) {
    console.log(req.session);
    console.log(req.signedCookies.user);
    if (req.session.user) {
        next();
    } else {
        res.redirect('/accounts/signin');
    }
};

module.exports = {
    signIn,
};
