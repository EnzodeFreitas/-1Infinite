var dashboardModel = require("../models/dashboardModel");

function salvarRota(req, res) {
    var id = req.body.id;
    var geojson = req.body.geojson;
    var distancia_km = req.body.distancia_km;
    var descricao = req.body.descricao;

    // const { id, geojson, distancia_km, descricao } = req.body;

    if (!geojson || !distancia_km || !descricao || !id) {
        return res.status(400).json({ erro: "Dados incompletos no corpo da requisição" });
    }

    dashboardModel.salvarRota(geojson, distancia_km, descricao, id)
        .then(() => {
            res.status(201).json({ sucesso: true, mensagem: "Rota salva com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao salvar rota:", erro);
            res.status(500).json({ erro: "Erro no servidor ao salvar a rota" });
        });
}

function salvarForma(req, res) {
    var id = req.body.id;
    var geojson = req.body.geojson;
    var tipo = req.body.tipo;
    var descricao = req.body.descricao;
    
    // const { id, tipo, geojson, descricao } = req.body;

    if (!id || !tipo || !geojson || !descricao) {
        return res.status(400).json({ erro: "Dados incompletos no corpo da requisição" });
    }

    dashboardModel.salvarForma(geojson, tipo, descricao, id)
        .then(() => {
            res.status(201).json({ sucesso: true, mensagem: "Forma salva com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao salvar forma:", erro);
            res.status(500).json({ erro: "Erro no servidor ao salvar a forma" });
        });
}

module.exports = {
    salvarRota,
    salvarForma
};
