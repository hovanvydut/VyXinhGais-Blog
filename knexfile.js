// Update with your config settings.
require('dotenv').config();

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: `${__dirname}/database/migrations`,
        },
    },
};
