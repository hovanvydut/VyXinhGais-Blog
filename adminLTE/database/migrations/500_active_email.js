const TABLE_NAME = 'active_email';
const generateId = require('../../common/generateId');

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .string('id')
            .primary()
            .defaultTo(generateId());
        table.string('id_user').notNullable();
        table
            .foreign('id_user')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('token').notNullable();
        table.string('expire').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
