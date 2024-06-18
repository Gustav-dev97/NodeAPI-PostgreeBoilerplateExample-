# NodeJS-API Boilerplate Example
Um boilerplate de uma API REST utilizando NodeJS + Express:

Este boilerplate de API REST tem como objetivo demonstrar um CRUD nos bancos de dados: MySQL, PostgreeSQL e MongoDB.

-----------------------------------------------------------------------------------------------------------------------------
# Para Executar a API:

1. Baixar o projeto

2. Executar no console para instalar as dependências: 

    npm install

3. Executar o projeto com o comando:

    node src/app.js

-----------------------------------------------------------------------------------------------------------------------------

# Para iniciar o container com o docker compose 

    •Alterar as configurações de conexão no database.js

    •Alterar as configurações no docker-compose.yml de acordo com seu arquivo database.js

 Executar:
 
	docker-compose up

-----------------------------------------------------------------------------------------------------------------------------
# Para interagir com a API:

A API utiliza a o localhost porta 3000 para realizar as funções CRUD, você poderá usar o rest client de sua preferência (como o
Postman ou Curl por exemplo).

# Registrar: 

•URL:

    POST
    localhost:3000/auth/register

•Exemplo:

    {
        "email": "seuEmail@email.com",
        "password": "senha123"
    }

# login: 

•URL: 

    POST
    localhost:3000/auth/login

•Exemplo:

    {
        "email": "seuEmail@email.com",
        "password": "senha123"
    }    

•Adicionar Token no HEADER:    

    KEY             |       VALUE

    Authorization       Bearer + <seu token>

•Uma outra alternativa é selecionar na interface do postman AUTHORIZATION:

    •Authorization > Bearer Token > Token:  <seu token>    

# CRUD: 

CREATE

    localhost:3000/users/mysql
    localhost:3000/users/postgres
    localhost:3000/users/mongo

READ

    GET 
    localhost:3000/users/mysql
    localhost:3000/users/postgres
    localhost:3000/users/mongo
    
UPDATE

    PUT 
    localhost:3000/users/mysql/{id}
    localhost:3000/users/postgres/{id}
    localhost:3000/users/mongo/{id}

DELETE

    DELETE 
    localhost:3000/users/mysql/{id}
    localhost:3000/users/postgres/{id}
    localhost:3000/users/mongo/{id}



-----------------------------------------------------------------------------------------------------------------------------

Estrutura do projeto: 

    /NodeJS-API
    |-- /src
    |   |-- /config
    |   |   |-- database.js  // Configurações de banco de dados.
    |   |-- /controllers
    |   |   |-- userController.js  // Controladores para interagir com os dados.
    |   |   |-- authController.js  // Controladores para Autenticação.
    |   |-- /middleware
    |   |   |-- authMiddleware.js  // Middleware de Autenticação.
    |   |-- /models
    |   |   |-- authModel.js  // Modelos de Autenticação.
    |   |   |-- userModel.js  // Modelos de dados.
    |   |-- /routes
    |   |   |-- authRoutes.js  // Rotas para Autenticação.
    |   |   |-- userRoutes.js  // Rotas para acessar os controladores.
    |   |-- app.js  // Inicialização do servidor Express.
    |-- /tests
    |   |-- app.test.js  // Testes para a API
    |-- Dockerfile  // Dockerfile para configurar o container.
    |-- docker-compose.yml  // Docker Compose para orquestrar os serviços.
    |-- package.json  // Dependências do projeto.

-----------------------------------------------------------------------------------------------------------------------------    

Passos realizados para a criação do boilerplate: 

# Configurar o servidor Express:

Criar src/app.js:

    const express = require('express');
    const userRoutes = require('./routes/userRoutes');

    const app = express();
    const PORT = process.env.PORT || 3000;

    // Middleware para processar requisições JSON
    app.use(express.json());

    // Configurar rotas
    app.use('/users', userRoutes);

    // Iniciar o servidor e ouvir na porta especificada
    app.listen(PORT, () => {
        // Obter a URL completa da API
        const serverAddress = `http://localhost:${PORT}`;

        // Log da URL base da API
        console.log(`Server Executando em ${serverAddress}`);
  
        // Exibir as rotas configuradas (opcional)
        console.log('Endpoints disponiveis da API:');
        console.log(`${serverAddress}/users/mysql`);
        console.log(`${serverAddress}/users/postgres`);
        console.log(`${serverAddress}/users/mongo`);
    });
    
-----------------------------------------------------------------------------------------------------------------------------

# 2. Configuração das Conexões com Bancos de Dados

Criar src/config/database.js

Configurar as conexões com MySQL, PostgreSQL e MongoDB:

    const mysql = require('mysql');
    const { Client } = require('pg');
    const mongoose = require('mongoose');

    // MySQL
    const mysqlPool = mysql.createPool({
        host: process.env.MYSQL_HOST || 'localhost',
        user: 'root',
        password: '',
        database: 'apidb',
        connectionLimit: 10
    });

    // Verificação de conexão MySQL (Remover após verificação inicial)
    mysqlPool.query('SELECT * FROM user', (err, res) => {
        if (err) {
            console.log('MySQL: Erro de Conexao:', err);
        } else {
            console.log('MySQL: Conectado com Sucesso. Resultados:', res);
        }
    });

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

    // MongoDB
    mongoose.connect("mongodb://0.0.0.0:27017/apidb", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            console.log("MongoDB Erro de Conexao:", err);
        } else {
            console.log("Conectado ao MongoDB");
        }
    });

    module.exports = { mysqlPool, postgresClient, mongoose };

-----------------------------------------------------------------------------------------------------------------------------

# 3. Consultas aos Bancos de Dados

src/models/userModel.js

Definir o modelo de dados para cada banco de dados:

    const { mysqlPool, postgresClient, mongoose } = require('../config/database');
    const { Schema, model } = mongoose;

    // MongoDB User Schema
    const userSchema = new Schema({
        nome: String,
        departamento: String
    });
    const User = model('User', userSchema);

    // MySQL
    const getUsersMySQL = (callback) => {
        mysqlPool.query('SELECT * FROM user', callback);
    };

    // PostgreSQL
    const getUsersPostgres = (callback) => {
        postgresClient.query('SELECT * FROM usuario', callback);
    };

    module.exports = { User, getUsersMySQL, getUsersPostgres };


-----------------------------------------------------------------------------------------------------------------------------

# 4. Controladores para gerenciar as operações de cada banco de dados.

src/controllers/userController.js

Definir o modelo de dados para cada banco de dados:

    const { User, getUsersMySQL, getUsersPostgres } = require('../models/userModel');
    const { mysqlPool, postgresClient } = require('../config/database'); // Adicione a importação de mysqlPool

    // Operações MySQL
    const getMySQLUsers = (req, res) => {
        getUsersMySQL((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    };

    const createMySQLUser = (req, res) => {
        const { nome, departamento } = req.body;
        mysqlPool.query(  // Agora mysqlPool está disponível
            'INSERT INTO user (nome, departamento) VALUES (?, ?)',
            [nome, departamento],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'Usuario criado!', userId: results.insertId });
            }
        );
    };

    const updateMySQLUser = (req, res) => {
        const { id } = req.params;
        const { nome, departamento } = req.body;
        mysqlPool.query(  // Agora mysqlPool está disponível
            'UPDATE user SET nome = ?, departamento = ? WHERE id = ?',
            [nome, departamento, id],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json({ message: 'Usuario Atualizado!' });
            }
        );
    };

    const deleteMySQLUser = (req, res) => {
        const { id } = req.params;
        mysqlPool.query(  // Agora mysqlPool está disponível
            'DELETE FROM user WHERE id = ?',
            [id],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json({ message: 'Usuario Deletado!' });
            }
        );
    };

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

    // Operações MongoDB
    const getMongoUsers = (req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(users);
        });
    };

    const createMongoUser = (req, res) => {
        const newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Usuario criado!', user });
        });
    };

    const updateMongoUser = (req, res) => {
        const { id } = req.params;
        User.findByIdAndUpdate(id, req.body, { new: true }, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Usuario Atualizado!', user });
        });
    };

    const deleteMongoUser = (req, res) => {
        const { id } = req.params;
        User.findByIdAndDelete(id, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Usuario Deletado!', user });
        });
    };

    module.exports = {
        getMySQLUsers, createMySQLUser, updateMySQLUser, deleteMySQLUser,
        getPostgresUsers, createPostgresUser, updatePostgresUser, deletePostgresUser,
        getMongoUsers, createMongoUser, updateMongoUser, deleteMongoUser
    };

-----------------------------------------------------------------------------------------------------------------------------

# 5. Definir as rotas para acessar os controladores.

src/routes/userRoutes.js

Adicionar Rotas com um sistema de validação:

    const express = require('express');
    const { check, validationResult } = require('express-validator');
    const {
        getMySQLUsers, getPostgresUsers, getMongoUsers,
        createMySQLUser, createPostgresUser, createMongoUser,
        updateMySQLUser, updatePostgresUser, updateMongoUser,
        deleteMySQLUser, deletePostgresUser, deleteMongoUser
    } = require('../controllers/userController');
    const authMiddleware = require('../middleware/authMiddleware'); // Importar o middleware de autenticação

    const router = express.Router();

    // Middleware de validação
    const validateUser = [
        check('nome').notEmpty().withMessage('O nome é obrigatório'),
        check('departamento').notEmpty().withMessage('O departamento é obrigatório')
    ];

    // MySQL Routes
    router.get('/mysql', authMiddleware, getMySQLUsers); // Proteger com autenticação
    router.post('/mysql', authMiddleware, validateUser, (req, res, next) => {
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }, createMySQLUser);
    router.put('/mysql/:id', authMiddleware, validateUser, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, updateMySQLUser);
    router.delete('/mysql/:id', authMiddleware, deleteMySQLUser);

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

    // MongoDB Routes
    router.get('/mongo', authMiddleware, getMongoUsers); // Proteger com autenticação
    router.post('/mongo', authMiddleware, validateUser, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, createMongoUser);
    router.put('/mongo/:id', authMiddleware, validateUser, (req, res, next) => {
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }, updateMongoUser);
    router.delete('/mongo/:id', authMiddleware, deleteMongoUser);

    module.exports = router;

-----------------------------------------------------------------------------------------------------------------------------


# Como Adaptar Este Boilerplate para um Novo Projeto

Para usar este boilerplate em um novo projeto de API, siga estas etapas:

1. Configurações de Banco de Dados

•Localização: src/config/database.js

•O que alterar:

    •Configure as credenciais de conexão (host, user, password, database) para cada banco de dados que você planeja usar (MySQL, PostgreSQL, MongoDB).

    •Verifique as queries de teste iniciais ou as remova após garantir que a conexão está funcionando.

•Exemplo:

    // Exemplo de configuração para MySQL
    const mysqlPool = mysql.createPool({
        host: 'novo-host',
        user: 'novo-usuario',
        password: 'nova-senha',
        database: 'novo-banco-de-dados',
        connectionLimit: 10
    });

2. Modelos de Dados

•Localização: src/models/userModel.js

•O que alterar:

    •Adapte os esquemas e modelos de dados para refletir as entidades do seu novo projeto.

    •Crie novos arquivos de modelo para novas entidades, se necessário.
•Exemplo:

    // Exemplo de esquema MongoDB adaptado
    const novoSchema = new Schema({
        campo1: String,
        campo2: Number,
        campo3: Boolean
    });

    const NovoModel = model('NovoModel', novoSchema);

3. Controladores

•Localização: src/controllers/userController.js

•O que alterar:

    •Implemente a lógica de negócios específica para cada entidade da sua API.

    •Adicione ou modifique controladores conforme necessário para novas funcionalidades.

•Exemplo:

    // Exemplo de controlador para criar um novo recurso
    const createNovoRecurso = (req, res) => {
        const { campo1, campo2 } = req.body;
        novoModel.create({ campo1, campo2 }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Recurso criado!', data: result });
        });
    };

4. Rotas

•Localização: src/routes/userRoutes.js

•O que alterar:

    •Mapeie novas rotas para os controladores correspondentes.
    •Adicione novos arquivos de rota se a API suportar várias entidades ou módulos.

•Exemplo:

    // Exemplo de rota para um novo recurso
    router.post('/novo-recurso', createNovoRecurso);

5. Dependências

•Localização: package.json

•O que alterar:

    •Adicione quaisquer novas dependências que você precisar.
    •Remova dependências que não são necessárias para o novo projeto.

•Exemplo:

    "dependencies": {
        "bcryptjs": "^2.4.3",
        "express": "^4.19.2",
        "express-validator": "^7.1.0",
        "jsonwebtoken": "^9.0.2",
        "mongoose": "^6.10.0",
        "mysql": "^2.18.1",
        "pg": "^8.12.0"
        // Adicione novas dependências aqui
    }

6. Variáveis de Ambiente

•Localização: docker-compose.yml

•O que alterar:

    •Defina variáveis de ambiente como credenciais de banco de dados ou portas de serviço.

•Exemplo:

    environment:
        MYSQL_HOST: novo-host
        MYSQL_USER: novo-usuario
        MYSQL_PASSWORD: nova-senha
        MYSQL_DATABASE: novo-banco-de-dados

7. Docker

•Localização: Dockerfile e docker-compose.yml

•O que alterar:

    •Modifique as configurações dos serviços ou adicione novos serviços conforme necessário.

•Exemplo:

    services:
        novo-servico:
            image: nova-imagem
            ports:
                - "8080:8080"

-----------------------------------------------------------------------------------------------------------------------------

# Código de Teste:

•Setup do Express: Configurar um aplicativo Express para o Supertest usar nos testes. Isso inclui o uso do middleware JSON e a inclusão das rotas da API.

•'describe' e 'it':

    •'describe' agrupa testes relacionados. Temos um grupo para cada tipo de banco de dados (API MySQL, API PostgreSQL, API MongoDB).

    •'it' define um teste específico. Cada it cobre uma operação CRUD específica.

•Testes GET, POST, PUT e DELETE:

    •GET: Verifica se o endpoint retorna uma lista de usuários.
    •POST: Verifica se um novo usuário pode ser criado com sucesso.
    •PUT: Verifica se um usuário existente pode ser atualizado.
    •DELETE: Verifica se um usuário pode ser deletado.

4. Executar os Testes

Para executar os testes, use o comando 'npm test' no terminal.

    npm test

O Jest vai procurar arquivos com extensão .test.js ou .spec.js e executá-los. Você verá um relatório dos testes no terminal, indicando quais passaram e quais falharam.

•Considerações Finais:

Banco de Dados de Teste: É recomendável usar um banco de dados separado ou um ambiente de banco de dados específico para testes. Isso evita que os dados de produção sejam alterados durante os testes.

Mocks e Stubs: Para testes mais avançados, usar mocks e stubs para simular respostas de banco de dados e outros serviços externos.

Cobertura de Testes: O Jest pode gerar relatórios de cobertura de testes que mostram quanto do código foi coberto pelos testes.
    
-----------------------------------------------------------------------------------------------------------------------------

Se precisar entrar em contato comigo pode me encontrar pelos meios de comunicação abaixo:

	e-Mail: gustavo.dev97@gmail.com
	GitHub: github.com/Gustav-dev97

Muito Obrigado!
