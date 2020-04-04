const TABLE_NAME = 'posts';

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.string('id').primary();
        table.string('title').notNullable();
        table.text('content', 'longtext').notNullable();
        table.string('author', 100).notNullable();
        table
            .foreign('author')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table
            .string('category', 100)
            .index()
            .notNullable();
        table
            .foreign('category')
            .references('id')
            .inTable('categories')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('linkPost').notNullable();
        table.string('description').notNullable();
        table.string('imgThumb').notNullable();
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
