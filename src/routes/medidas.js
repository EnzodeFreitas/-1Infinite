var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/formas/:id", function (req, res) {
    medidaController.buscarFormasPorIdUsuario(req, res);
})

router.get("/rotas/:id", function (req, res) {
    medidaController.buscarRotasPorIdUsuario(req, res);
});

router.get("/formas/por-dia/:id", function (req, res) {
    medidaController.buscarFormasPorDia(req, res);
});

// router.get("/formas-e-rotas/:id", function (req, res) {
//     medidaController.buscarFormasERotasPorUsuario(req, res);
// });

module.exports = router;