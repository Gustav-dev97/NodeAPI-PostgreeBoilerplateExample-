const request = require('supertest');
const express = require('express');
const userRoutes = require('../src/routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

// Testes para a API PostgreSQL
describe('API PostgreSQL', () => {
  it('deve obter todos os usuários (GET /users/postgres)', async () => {
    const response = await request(app).get('/users/postgres');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('deve criar um novo usuário (POST /users/postgres)', async () => {
    const newUser = { nome: 'Teste', departamento: 'QA' };
    const response = await request(app).post('/users/postgres').send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty('id');
  });

  it('deve atualizar um usuário existente (PUT /users/postgres/:id)', async () => {
    const updatedUser = { nome: 'Teste Atualizado', departamento: 'Desenvolvimento' };
    const response = await request(app).put('/users/postgres/1').send(updatedUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User updated');
  });

  it('deve deletar um usuário (DELETE /users/postgres/:id)', async () => {
    const response = await request(app).delete('/users/postgres/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted');
  });
});
