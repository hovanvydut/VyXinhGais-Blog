const generateId = require('../../common/generateId');

const TABLE_NAME = 'reply_comment';

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .string('id')
            .primary()
            .defaultTo(generateId());
        table.text('content', 'mediumtext').notNullable();
        table.string('comment_id').notNullable();
        table
            .foreign('comment_id')
            .references('id')
            .inTable('comments')
            .onDelete('CASCADE');
        table.string('user_id').notNullable();
        table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.datetime('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
