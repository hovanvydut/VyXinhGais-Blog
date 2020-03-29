const cron = require('node-cron');
const knex = require('../database/connection');
const { DBError } = require('./customErr');

const deleteUserIsNotActiveEmail = cron.schedule(
    '30 32 20 * * *',
    async () => {
        try {
            await knex('users')
                .where({ is_active_email: false })
                .del();
        } catch (err) {
            console.log(err);
        }
    },
    {
        scheduled: false,
    }
);

const testCronJob = cron.schedule(
    '00 46 20 * * *',
    async () => {
        try {
            console.log('hihi');
        } catch (err) {
            console.log(err);
        }
    },
    {
        scheduled: false,
    }
);

module.exports = {
    deleteUserIsNotActiveEmail,
    testCronJob,
};
