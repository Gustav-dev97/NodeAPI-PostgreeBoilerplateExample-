const { postgresClient } = require('../config/database');

// PostgreSQL
const getUsersPostgres = (callback) => {
  postgresClient.query('SELECT * FROM usuario', callback);
};

module.exports = { getUsersPostgres };
