const renderCategory = (req, res) => {
    const { user } = req.session;
    return res.render('admin/pages/category', {
        user,
    });
};

module.exports = {
    renderCategory,
};
