-- Abrir terminal (1  postgres)
psql -U postgres
CREATE DATABASE softlife;

\c softlife

\l visualiza bases de datos


CREATE TABLE usuarios (
	email varchar(25), 
	password varchar(25)
);




SELECT * FROM usuarios;

-- Abrir terminal(2 bash)
