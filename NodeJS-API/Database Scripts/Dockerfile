# Usar uma imagem base do Node.js
FROM node:14

# Definir o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# RUN npm install pg:latest

# RUN npm install express-validator jsonwebtoken bcryptjs

# Copiar todo o código da aplicação
COPY . .

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "node", "src/app.js" ]
