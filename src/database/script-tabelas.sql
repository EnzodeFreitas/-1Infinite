CREATE DATABASE infinite;

USE infinite;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
    senha VARCHAR(50),
	email VARCHAR(50)
);
select * from usuario;

CREATE TABLE mapa (
id INT PRIMARY KEY AUTO_INCREMENT,
qtdRotas INT,
qtdRetangulos INT,
qtdCircunferencia INT,
qtdMarcador INT,
qtdMarcadorArea INT,
fkUsuario INT,
FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE grupo (
id INT PRIMARY KEY,
nome VARCHAR(45), 
descricao VARCHAR(300)
);

CREATE TABLE usuario_grupo (
fkUsuario INT,
fkGrupo INT,
usuarios_total INT,
usuarios_online INT,
FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
FOREIGN KEY (fkGrupo) REFERENCES grupo(id),
PRIMARY KEY(fkUsuario, fkGrupo)
);