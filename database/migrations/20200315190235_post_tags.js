const TABLE_NAME = 'post_tags';

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.string('id').primary();
        table.string('post_id').notNullable();
        table
            .foreign('post_id')
            .references('id')
            .inTable('posts');
        table.string('tag_id').notNullable();
        table
            .foreign('tag_id')
            .references('id')
            .inTable('tags');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
