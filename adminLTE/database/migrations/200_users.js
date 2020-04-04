const TABLE_NAME = 'users';

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.string('id', 100).primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('avatar').defaultTo('/static/uploads/default-avatar.png');
        table.string('role', 50).defaultTo('customer');
        table.boolean('is_active_email').defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
