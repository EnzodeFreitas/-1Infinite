const express = require("express");
const router = express.Router();
var dashboardController = require("../controllers/dashboardController");
router.post("/api/salvar-forma", (req, res) => {
    const { geojson, tipo, descricao, id } = req.body;

    console.log("Forma recebida:", geojson);

    res.json({ sucesso: true, mensagem: "Forma salva com sucesso!" });
});

router.post("/api/salvar-rota", (req, res) => {
    const { geojson, distancia_km, descricao, id } = req.body;
    dashboardController.salvarRota(req, res)


    // Aqui você salva a rota no banco
    console.log("Rota recebida:", geojson, distancia_km, );

    res.json({ sucesso: true, mensagem: "Rota salva com sucesso!" });
});

module.exports = router;
