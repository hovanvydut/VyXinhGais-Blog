const domain = 'admin';
const renderPostPage = (req, res) => {
    const { user } = req.session;
    res.render(`${domain}/pages/post`, {
        title: 'Danh sách tất cả các bài viết',
        breadscrumb: [
            { content: 'hihi', href: '/abc' },
            { content: 'haha', href: '#' },
        ],
        user,
    });
};

module.exports = {
    renderPostPage,
};
