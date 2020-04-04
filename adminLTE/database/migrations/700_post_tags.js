const generateId = require('../../common/generateId');

const TABLE_NAME = 'post_tags';

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .string('id')
            .primary()
            .defaultTo(generateId());
        table.string('post_id').notNullable();
        table
            .foreign('post_id')
            .references('id')
            .inTable('posts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('tag_id').notNullable();
        table
            .foreign('tag_id')
            .references('id')
            .inTable('tags')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
