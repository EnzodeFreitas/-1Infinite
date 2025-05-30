var medidaModel = require("../models/medidaModel");

function buscarRotasPorIdUsuario(req, res) {

    var id = req.params.id;

    console.log(`Obtendo rotas do Usuário.`);

    medidaModel.buscarRotasPorIdUsuario(id, ).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao obter as rotas do usuário.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarFormasPorIdUsuario(req, res) {

    var id = req.params.id;

    console.log(`Obtendo formas do Usuário.`);

    medidaModel.buscarFormasPorIdUsuario(id, ).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao obter as formas do usuário.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarRotasPorIdUsuario,
    buscarFormasPorIdUsuario
}
