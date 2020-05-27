const knex = require('../../database/connection');

const getAllCategories = async (req, res) => {
    // `${process.env.HOST}/api/v1/categories
    try {
        const data = await knex('categories')
            .select(
                'categories.id',
                'categories.name',
                'categories.linkCategory'
            )
            .innerJoin('posts', 'posts.category', '=', 'categories.id')
            .groupBy('categories.id')
            .count('posts.id as countPost');
        return res.status(200).json(data);
    } catch (err) {
        return res.status(404).json('Error when query database!');
    }
};

const filterPostByCategory = async (req, res) => {
    const { linkCategory } = req.params;
    try {
        const data = await knex
            .from('categories')
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
            .where('categories.linkCategory', '=', linkCategory)
            .innerJoin('posts', 'posts.category', '=', 'categories.id')
            .innerJoin('users', 'users.id', '=', 'posts.author');
        return res.status(200).json(data);
    } catch (err) {
        return res.status(404).json(err.message);
    }
};

module.exports = {
    getAllCategories,
    filterPostByCategory,
};
