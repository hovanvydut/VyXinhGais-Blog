const TABLE_NAME = 'users';
const generateId = require('./../../common/generateId');
const config = require('./../../common/config');

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .string('id', 100)
            .primary()
            .defaultTo(generateId());
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('avatar').defaultTo(config.defaultAvatar());
        table.string('role', 50).defaultTo('customer');
        table.boolean('is_active_email').defaultTo(false);
        table.text('introduce').defaultTo('');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
