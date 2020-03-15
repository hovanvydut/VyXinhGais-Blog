const TABLE_NAME = 'tags';

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.interger('count').unsigned();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
