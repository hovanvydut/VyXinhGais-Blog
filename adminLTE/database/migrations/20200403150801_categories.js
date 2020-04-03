const TABLE_NAME = 'categories';
const generateId = require('./../../common/generateId');

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .string('id')
            .primary()
            .defaultTo(generateId());
        table.string('name').notNullable();
        table.string('linkCategory').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
