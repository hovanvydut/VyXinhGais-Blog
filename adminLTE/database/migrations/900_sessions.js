const TABLE_NAME = 'sessions';

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.string('session_id', 128).collate('utf8mb4_bin').primary();
        table.integer('expires', 11).unsigned().notNullable();
        table
            .text('data', 'mediumtext')
            .collate('utf8mb4_bin');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
