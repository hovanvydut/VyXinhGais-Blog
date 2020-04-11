const TABLE_NAME = 'categories';
const generateId = require('../../common/generateId');

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .string('id', 100)
            .primary()
            .defaultTo(generateId());
        table.string('name').notNullable();
        table.string('linkCategory').notNullable();
        table
            .integer('countPost')
            .unsigned()
            .defaultTo(0);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
