const signIn = function(req, res, next) {
    console.log(req.session);
    if (req.session.user) {
        next();
    } else {
        res.redirect('/accounts/signin');
    }
};

module.exports = {
    signIn,
};
