// src/models/authModel.js

// Em memória: armazenamento de usuários autenticados
const users = [];

// Função para encontrar um usuário pelo email
const findUserByEmail = async (email) => {
  return users.find(user => user.email === email);
};

// Função para criar um novo usuário
const createUser = async (email, hashedPassword) => {
  const newUser = { email, password: hashedPassword };
  users.push(newUser);
  return newUser;
};

module.exports = {
  findUserByEmail,
  createUser,
};

