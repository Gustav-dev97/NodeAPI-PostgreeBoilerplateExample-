const { User, getUsersPostgres } = require('../models/userModel');
const { postgresClient } = require('../config/database'); // Adicione a importação de mysqlPool

// Operações PostgreSQL
const getPostgresUsers = (req, res) => {
  getUsersPostgres((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results.rows);
  });
};

const createPostgresUser = (req, res) => {
  const { nome, departamento } = req.body;
  postgresClient.query(
    'INSERT INTO usuario (nome, departamento) VALUES ($1, $2) RETURNING *',
    [nome, departamento],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Usuario criado!', user: results.rows[0] });
    }
  );
};

const updatePostgresUser = (req, res) => {
  const { id } = req.params;
  const { nome, departamento } = req.body;
  postgresClient.query(
    'UPDATE usuario SET nome = $1, departamento = $2 WHERE id = $3 RETURNING *',
    [nome, departamento, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Usuario Atualizado!', user: results.rows[0] });
    }
  );
};

const deletePostgresUser = (req, res) => {
  const { id } = req.params;
  postgresClient.query(
    'DELETE FROM usuario WHERE id = $1 RETURNING *',
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Usuario Deletado!', user: results.rows[0] });
    }
  );
};

module.exports = {
  getPostgresUsers, createPostgresUser, updatePostgresUser, deletePostgresUser,
};
