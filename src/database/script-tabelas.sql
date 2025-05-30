CREATE DATABASE infinite;
USE infinite;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    senha VARCHAR(45) NOT NULL, 
    email VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE rota (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    geojson JSON NOT NULL,
    distancia_km FLOAT,
    descricao TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE forma (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    tipo ENUM('polygon', 'circle', 'rectangle', 'marker') NOT NULL,
    geojson JSON NOT NULL,
    descricao TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
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

