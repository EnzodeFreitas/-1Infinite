var database = require("../database/config")

function exibirGraficoHeatmap () {
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function exibirGraficoBarra(id) {
    var instrucaoSql = `
        SELECT qtdRotas, qtdRetangulos, qtdCircunferencia, qtdMarcador, qtdMarcadorArea
        FROM mapa WHERE fkUsuario = '${id}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function exibirGraficoLinha() {
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = { exibirGraficoHeatmap, exibirGraficoBarra, exibirGraficoLinha};

