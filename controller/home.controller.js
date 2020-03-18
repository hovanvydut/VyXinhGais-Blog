const domain = 'admin';
const renderHomePage = (req, res) => {
    console.log('renderHomePage');
    const { user } = req.session;
    res.render(`${domain}/pages/home`, {
        user,
    });
};

module.exports = {
    renderHomePage,
};
