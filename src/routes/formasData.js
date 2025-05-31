var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/formas/:id", function (req, res) {
    medidaController.buscarFormasPorIdUsuario(req, res);
})

module.exports = router;