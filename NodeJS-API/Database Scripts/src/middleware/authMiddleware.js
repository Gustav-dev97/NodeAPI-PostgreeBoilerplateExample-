// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secreta'; // Certifique-se de usar a mesma chave secreta

const authMiddleware = (req, res, next) => {
  console.log('Middleware de autenticação chamado'); // Log de debug

  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ msg: 'Não autorizado, token não encontrado' });
  }

  const token = authHeader.split(' ')[1]; // Extrai o token do formato `Bearer <token>`
  console.log('Token extraído:', token); // Log de debug

  if (!token) {
    return res.status(401).json({ msg: 'Não autorizado, token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Token decodificado:', decoded); // Log de debug
    req.user = decoded.userId;
    next();
  } catch (err) {
    console.error('Erro ao verificar token:', err.message); // Log de erro
    res.status(401).json({ msg: 'Token inválido' });
  }
};

module.exports = authMiddleware;
