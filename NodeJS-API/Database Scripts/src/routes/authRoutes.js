const express = require('express');
const { check, validationResult } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Middleware de validação para registro e login
const validateAuth = [
  check('email').isEmail().withMessage('Por favor, insira um email válido'),
  check('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
];

// Rota de registro
router.post('/register', validateAuth, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, registerUser);

// Rota de login
router.post('/login', validateAuth, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, loginUser);

module.exports = router;

