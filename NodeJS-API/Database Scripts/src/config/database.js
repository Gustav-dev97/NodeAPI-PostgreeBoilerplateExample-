const { Client } = require('pg');

// PostgreSQL
const postgresClient = new Client({
  host: process.env.POSTGRES_HOST || 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'root',
  database: 'apidb'
});

postgresClient.connect(err => {
  if (err) {
    console.log('PostgreSQL Erro de Conexao:', err);
  } else {
    console.log('Conectado ao PostgreSQL');
  }
});

module.exports = { postgresClient };