const knex = require('../database/connection');

const login = async (req, res) => {
    const data = await knex.select().from('user');
    console.log(data);
};

module.exports = {
    login,
};
