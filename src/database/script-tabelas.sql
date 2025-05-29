CREATE DATABASE infinite;
USE infinite;

CREATE TABLE IF NOT EXISTS usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    senha VARCHAR(45) NOT NULL, 
    email VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS mapa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    nome VARCHAR(50) DEFAULT 'Mapa do Usuário',
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rota (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkMapa INT NOT NULL,
    geojson JSON NOT NULL,
    distancia_km FLOAT,
    descricao TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkMapa) REFERENCES mapa(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS forma (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkMapa INT NOT NULL,
    tipo ENUM('polygon', 'circle', 'rectangle', 'marker') NOT NULL,
    geojson JSON NOT NULL,
    descricao TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkMapa) REFERENCES mapa(id) ON DELETE CASCADE
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

