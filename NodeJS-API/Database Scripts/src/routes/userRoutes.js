const express = require('express');
const { check, validationResult } = require('express-validator');
const {
  getPostgresUsers, 
  createPostgresUser, 
  updatePostgresUser, 
  deletePostgresUser, 
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Importar o middleware de autenticação

const router = express.Router();

// Middleware de validação
const validateUser = [
  check('nome').notEmpty().withMessage('O nome é obrigatório'),
  check('departamento').notEmpty().withMessage('O departamento é obrigatório')
];

// PostgreSQL Routes
router.get('/postgres', authMiddleware, getPostgresUsers); // Proteger com autenticação
router.post('/postgres', authMiddleware, validateUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, createPostgresUser);
router.put('/postgres/:id', authMiddleware, validateUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, updatePostgresUser);
router.delete('/postgres/:id', authMiddleware, deletePostgresUser);

module.exports = router;
