const knex = require('../../database/connection');

const getThumbPost = async (req, res) => {
    // `${DOMAIN}/api/v1/thumb-posts?subject=${subject}`
    const { subject } = req.query;
    if (subject === 'newest') {
        const data = await knex('posts').select();
        return res.status(200).json(data);
    }
    return res.status(404);
};

const getPost = async (req, res) => {
    // `${DOMAIN}/api/v1/posts?linkPost=${linkPost}`
    const { linkPost } = req.params;
    const data = await knex('posts')
        .select()
        .where({ linkPost })
        .first();
    return res.status(200).json(data);
};

module.exports = {
    getThumbPost,
    getPost,
};
