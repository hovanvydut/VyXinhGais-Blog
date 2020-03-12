const TABLE_NAME = 'sessions';

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.string('session_id', 128).primary();
        table
            .integer('expires', 11)
            .unsigned()
            .notNullable();
        table.text('data', 'mediumtext').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
