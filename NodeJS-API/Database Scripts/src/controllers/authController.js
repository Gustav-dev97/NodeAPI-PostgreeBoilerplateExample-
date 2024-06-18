// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/authModel');

const SECRET_KEY = 'secreta'; // Defina sua chave secreta

// Registrar um novo usuário
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await findUserByEmail(email);
    if (user) {
      return res.status(400).json({ msg: 'Usuário já registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await createUser(email, hashedPassword);

    const payload = { userId: email }; // Usamos o email como identificador único
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login de usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    const payload = { userId: email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    const expirationTime = Date.now() + 60 * 60 * 1000;
    const expirationDate = new Date(expirationTime);

    res.status(200).json({
      token,
      expiresAt: expirationDate.toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser };
