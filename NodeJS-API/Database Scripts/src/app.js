const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // Importar rotas de autenticação

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar requisições JSON
app.use(express.json());

// Configurar rotas
app.use('/users', userRoutes);
app.use('/auth', authRoutes); // Registrar rotas de autenticação

// Iniciar o servidor e ouvir na porta especificada
app.listen(PORT, () => {
  // Obter a URL completa da API
  const serverAddress = `http://localhost:${PORT}`;

  // Log da URL base da API
  console.log(`Server Executando em ${serverAddress}`);
  
  // Exibir as rotas configuradas (opcional)
  console.log('Endpoints disponiveis da API:');
  console.log(`${serverAddress}/users/postgres`);
  console.log(`${serverAddress}/auth/register`);
  console.log(`${serverAddress}/auth/login`);
});
