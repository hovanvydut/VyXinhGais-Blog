const knex = require('../../database/connection');

const getAllCategories = async (req, res) => {
    // `${process.env.HOST}/api/v1/categories
    try {
        const data = await knex('categories').select();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(404).json('Error when query database!');
    }
};

module.exports = {
    getAllCategories,
};
