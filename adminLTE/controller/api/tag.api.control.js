const knex = require('../../database/connection');

const getAllTags = async (req, res) => {
    // `${process.env.HOST}/api/v1/tags
    try {
        const data = await knex('tags')
            .select('tags.id', 'tags.name')
            .leftJoin('post_tags', 'tags.id', '=', 'post_tags.tag_id')
            .groupBy('tags.id')
            .count('tag_id as countPost');
        return res.status(200).json(data);
    } catch (err) {
        return res.status(404).json(err.message);
    }
};

const filterPostByTag = async (req, res) => {
    const { tagName } = req.params;
    // `${process.env.HOST}/api/v1/tags
    try {
        const data = await knex
            .from('tags')
            .select(
                'posts.id',
                'posts.title',
                'posts.linkPost',
                'posts.description',
                'posts.imgThumb',
                'posts.countView',
                'posts.created_at',
                'users.name',
                'categories.name as category'
            )
            .where('tags.name', '=', tagName)
            .innerJoin('post_tags', 'post_tags.tag_id', '=', 'tags.id')
            .innerJoin('posts', 'posts.id', '=', 'post_tags.post_id')
            .innerJoin('users', 'users.id', '=', 'posts.author')
            .innerJoin('categories', 'categories.id', '=', 'posts.category');
        return res.status(200).json(data);
    } catch (err) {
        return res.status(404).json(err);
    }
};

module.exports = {
    getAllTags,
    filterPostByTag,
};
