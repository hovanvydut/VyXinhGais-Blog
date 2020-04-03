const speakingUrl = require('speakingurl');
const knex = require('../../database/connection');
const { DBError } = require('../../common/customErr');
const generateId = require('./../../common/generateId');

const multipleSpace = /\s(?=\s)/g;

const renderCategory = async (req, res, next) => {
    const { user } = req.session;
    const message = req.flash('message')[0];
    let categories;

    try {
        categories = await knex('categories').select();
    } catch (err) {
        return next(new DBError(err.message));
    }

    return res.render('admin/pages/category', {
        user,
        categories,
        message,
    });
};

const createNewCategory = async (req, res, next) => {
    let { nameCategory } = req.body;
    nameCategory = nameCategory.trim().replace(multipleSpace, '');

    try {
        await knex('categories').insert({
            id: generateId(),
            name: nameCategory,
            linkCategory: `${speakingUrl(nameCategory)}-${generateId(1)}`,
        });
    } catch (err) {
        return next(new DBError(err.message));
    }

    // ? message'status must be in [success, info, warning, error]
    req.flash('message', {
        status: 'success',
        name: 'Create new category successfully!',
    });
    return res.redirect('/admin/categories');
};

const renderEditCategory = async (req, res, next) => {
    const { user } = req.session;
    const { linkCategory } = req.params;
    let category;

    try {
        category = await knex('categories')
            .select()
            .where({ linkCategory })
            .first();
    } catch (err) {
        return next(new DBError(err.message));
    }

    return res.render('admin/pages/editCategory', {
        title: 'Viết bài',
        breadscrumb: [
            { content: 'categories', href: '/admin/categories' },
            { content: category.name, href: '#' },
        ],
        user,
        category,
    });
};

const deleteCategory = async (req, res, next) => {
    const { idCategory } = req.params;

    try {
        await knex('categories')
            .where({ id: idCategory })
            .del();
    } catch (err) {
        return next(new DBError(err.message));
    }
    req.flash('message', { status: 'success', name: 'Delete successfully!' });
    return res.redirect('/admin/categories');
};

const updateCategory = async (req, res, next) => {
    let { categoryName } = req.body;
    const { idCategory } = req.params;
    categoryName = categoryName.trim().replace(multipleSpace, '');

    try {
        await knex('categories')
            .where({ id: idCategory })
            .update({
                name: categoryName,
                linkCategory: `${speakingUrl(categoryName)}-${generateId(1)}`,
            });
    } catch (err) {
        return next(new DBError(err.message));
    }

    req.flash('message', { status: 'success', name: 'Update successfully!' });
    return res.redirect('/admin/categories');
};

module.exports = {
    renderCategory,
    createNewCategory,
    renderEditCategory,
    deleteCategory,
    updateCategory,
};
