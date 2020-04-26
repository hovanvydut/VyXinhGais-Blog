// Update with your config settings.
require('dotenv').config();

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
        },
        migrations: {
            directory: `${__dirname}/database/migrations`,
        },
        seeds: {
            directory: `${__dirname}/database/seed`,
        },
    },
};
