const knex = require('./../database/connection');
const generateId = require('./../common/generateId');

const domain = 'admin';

const renderTagPage = async (req, res) => {
    const { user } = req.session;
    const tags = await knex.select().from('tags');
    console.log(tags);
    res.render(`${domain}/pages/tag`, {
        user,
        tags,
    });
};

const addNewTag = async (req, res) => {
    await knex
        .insert({ id: generateId(), name: req.body.nameTag })
        .into('tags');
    res.redirect('/admin/tags');
};

module.exports = {
    renderTagPage,
    addNewTag,
};
