const knex = require('../../database/connection');

const getAllPopularArticle = async (req, res) => {
    // `${process.env.HOST}/api/v1/popular-article
    try {
        const data = await knex('posts')
            .select(
                'posts.id',
                'posts.title',
                'posts.created_at',
                'posts.countView',
                'posts.linkPost',
                'posts.imgThumb',
                'users.name as authorName'
            )
            .innerJoin('users', 'users.id', '=', 'posts.author')
            .orderBy('countView', 'desc')
            .limit(5);
        return res.status(200).json(data);
    } catch (err) {
        return res.status(404).json(err.message);
    }
};

module.exports = {
    getAllPopularArticle,
};
