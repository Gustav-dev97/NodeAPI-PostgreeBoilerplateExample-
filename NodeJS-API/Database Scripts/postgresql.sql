CREATE DATABASE apidb;

CREATE TABLE IF NOT EXISTS usuario
(
	id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    departamento VARCHAR(255)
);

INSERT INTO usuario (nome, departamento) VALUES ('Gustavo', 'Desenvolvimento'), ('Jose', 'Teste');

SELECT * FROM usuario;