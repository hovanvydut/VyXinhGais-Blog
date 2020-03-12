const signIn = function(req, res, next) {
    console.log(req.session);
    if (req.session.user) {
        next();
    } else {
        res.redirect('/accounts/signin');
    }
};

const isLogining = function(req, res, next) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = {
    signIn,
    isLogining,
};
