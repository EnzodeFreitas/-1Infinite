var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/salvar-forma", (req, res) => {
    const { geojson, tipo, descricao, id } = req.body;
    console.log("Forma recebida:", { geojson, tipo, descricao, id }); 
    dashboardController.salvarForma(req, res);
});

router.post("/salvar-rota", (req, res) => {
    const { geojson, distancia_km, descricao, id } = req.body;
    console.log("Rota recebida:", { geojson, distancia_km, descricao, id }); 
    dashboardController.salvarRota(req, res);
});

module.exports = router;