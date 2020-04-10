const knex = require('../../database/connection');

const getAllTags = async (req, res) => {
    // `${process.env.HOST}/api/v1/tags
    try {
        const data = await knex('tags').select();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(404).json('Error when query database!');
    }
};

module.exports = {
    getAllTags,
};
