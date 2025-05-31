var medidaModel = require("../models/medidaModel");

function buscarRotasPorIdUsuario(req, res) {

    var id = req.params.id;

    console.log(`Obtendo rotas do Usuário.`);

    medidaModel.buscarRotasPorIdUsuario(id).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(200).json([])
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

    medidaModel.buscarFormasPorIdUsuario(id).then(function (resultado) {
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

function buscarFormasPorDia(req, res) {
    var id = req.params.id;
    console.log(`Obtendo formas por dia do usuário.`);

    medidaModel.buscarFormasPorDia(id).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Erro ao buscar formas por dia:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// function buscarFormasERotasPorUsuario(req, res) {
//     var id = req.params.id;

//     console.log(`Obtendo formas e rotas do usuário.`);

//     // Promisse.all executa múltiplas promessas em paralelo e espera todas elas serem resolvidas antes de continuar.
//     Promise.all([
//         medidaModel.buscarFormasPorIdUsuario(id),
//         medidaModel.buscarRotasPorIdUsuario(id)
//     ])
//     .then(function ([formas, rotas]) {
//         res.status(200).json({
//             formas,
//             rotas
//         });
//     })
//     .catch(function (erro) {
//         console.log("Erro ao buscar formas e rotas:", erro.sqlMessage || erro);
//         res.status(500).json({ erro: "Erro ao buscar formas e rotas." });
//     });
// }

module.exports = {
    buscarRotasPorIdUsuario,
    buscarFormasPorIdUsuario,
    buscarFormasPorDia,
    // buscarFormasERotasPorUsuario
}
