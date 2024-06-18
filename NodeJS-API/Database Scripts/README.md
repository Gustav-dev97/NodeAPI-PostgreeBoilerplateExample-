# NodeAPI-PostgreeBoilerplateExample
Um boilerplate de uma API REST utilizando NodeJS + Express:

Este boilerplate de API REST tem como objetivo demonstrar um CRUD no banco de dados: PostgreeSQL.

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

    localhost:3000/users/postgres

READ

    GET 
    localhost:3000/users/postgres
    
UPDATE

    PUT 
    localhost:3000/users/postgres/{id}

DELETE

    DELETE 
    localhost:3000/users/postgres/{id}



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

Se precisar entrar em contato comigo pode me encontrar pelos meios de comunicação abaixo:

	e-Mail: gustavo.dev97@gmail.com
	GitHub: github.com/Gustav-dev97

Muito Obrigado!
