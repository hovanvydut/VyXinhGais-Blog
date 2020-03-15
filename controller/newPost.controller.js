const domain = 'admin';

const renderNewPostPage = (req, res) => {
    const { user } = req.session;
    res.render(`${domain}/pages/newPost`, {
        title: 'Viết bài',
        breadscrumb: [
            { content: 'danh sách bài viết', href: '/post' },
            { content: 'bài viết mới', href: '#' },
        ],
        user,
    });
};

module.exports = {
    renderNewPostPage,
};
