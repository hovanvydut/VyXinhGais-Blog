const knex = require('../../database/connection');

const getThumbPost = async (req, res) => {
    // `${DOMAIN}/api/v1/thumb-posts?subject=${subject}`
    const { subject } = req.query;
    if (subject === 'newest') {
        let data;
        try {
            data = await knex
                .from('posts')
                .select([
                    'posts.id',
                    'posts.title',
                    'posts.description',
                    'posts.linkPost',
                    'posts.imgThumb',
                    'posts.created_at',
                    'posts.countView',
                    'categories.name as category',
                ])
                .innerJoin(
                    'categories',
                    'categories.id',
                    '=',
                    'posts.category'
                );
            return res.status(200).json(data);
        } catch (err) {
            return res.status(404).json(err.message);
        }
    }
    return res.status(404).json('Error occur when query DB');
};

const getPost = async (req, res) => {
    // `${DOMAIN}/api/v1/posts?linkPost=${linkPost}`
    const { linkPost } = req.params;
    let data;
    try {
        data = await knex('posts')
            .select()
            .where({ linkPost })
            .first();

        await knex('posts')
            .where({ linkPost })
            .increment('countView', 1);

        return res.status(200).json(data);
    } catch (err) {
        return res.status(404).json(err.message);
    }
};

module.exports = {
    getThumbPost,
    getPost,
};
