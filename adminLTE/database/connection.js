const knex = require('knex');
const config = require('./../knexfile');

const env = 'development';
const myKnex = knex(config[env]);

module.exports = myKnex;
