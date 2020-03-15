const knex = require('./../database/connection');
const generateId = require('./../common/generateId');

const domain = 'admin';

const renderTagPage = async (req, res) => {
    const { user } = req.session;
    const tags = await knex.select().from('tags');
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

const editTag = async (req, res) => {
    const { id } = req.params;
    const tag = await knex('tags')
        .where({ id })
        .select();
    const { user } = req.session;

    res.render('admin/pages/editTag', {
        title: 'Chỉnh sửa tag',
        breadscrumb: [
            { content: 'hihi', href: '/abc' },
            { content: 'haha', href: '#' },
        ],
        user,
        tag: tag[0],
    });
};

const updateTag = async function(req, res) {
    const { id } = req.params;
    console.log(id);
    const { tagName } = req.body;
    await knex('tags')
        .where({ id })
        .update({
            name: tagName,
        });
    res.redirect('/admin/tags');
};

module.exports = {
    renderTagPage,
    addNewTag,
    editTag,
    updateTag,
};
