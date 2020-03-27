const domain = 'admin';

const renderHomePage = (req, res) => {
    const { user } = req.session;
    const resendActiveEmailSuccess = req.flash('resendActiveEmailSuccess');
    res.render(`${domain}/pages/home`, {
        user,
        resendActiveEmailSuccess: resendActiveEmailSuccess[0],
    });
};

const blankMessage = (req, res) => {
    const message = req.flash('blankMessage');
    return res.render('admin/pages/blankMessage', {
        message: message[0],
    });
};

module.exports = {
    renderHomePage,
    blankMessage,
};
