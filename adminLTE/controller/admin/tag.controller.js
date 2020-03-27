const knex = require('../../database/connection');
const generateId = require('../../common/generateId');
const { DBError } = require('../../common/customErr');

const domain = 'admin';

const renderTagPage = async (req, res, next) => {
    const { user } = req.session;
    let tags;

    try {
        tags = await knex.select().from('tags');
    } catch (err) {
        return next(new DBError(err.message));
    }

    res.render(`${domain}/pages/tag`, {
        user,
        tags,
    });
};

const addNewTag = async (req, res, next) => {
    try {
        await knex
            .insert({ id: generateId(), name: req.body.nameTag })
            .into('tags');
    } catch (err) {
        return next(new DBError(err.message));
    }

    res.redirect('/admin/tags');
};

const editTag = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req.session;
    let tag;

    try {
        tag = await knex('tags')
            .where({ id })
            .select();
    } catch (err) {
        return next(new DBError(err.message));
    }

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

const updateTag = async function(req, res, next) {
    const { id } = req.params;
    const { tagName } = req.body;

    try {
        await knex('tags')
            .where({ id })
            .update({
                name: tagName,
            });
    } catch (err) {
        return next(new DBError(err.message));
    }

    res.redirect('/admin/tags');
};

const deleteTask = async (req, res, next) => {
    const { id } = req.params;

    try {
        await knex('tags')
            .where({ id })
            .del();
    } catch (err) {
        return next(new DBError(err.message));
    }

    return res.redirect('/admin/tags');
};

module.exports = {
    renderTagPage,
    addNewTag,
    editTag,
    updateTag,
    deleteTask,
};
