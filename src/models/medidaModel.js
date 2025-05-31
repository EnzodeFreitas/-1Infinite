var database = require("../database/config");

function buscarFormasPorIdUsuario(id) {
    var instrucaoSql = `
        SELECT tipo AS ferramenta, COUNT(*) AS quantidade FROM forma WHERE fkUsuario = ${id} GROUP BY tipo ORDER BY FIELD(tipo, 'Polígono criativo', 'Retângulo', 'Circunferência', 'Marcador');;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRotasPorIdUsuario(id) {
    var instrucaoSql = `
            SELECT 
            distancia_km,
            criado_em
                FROM rota
                WHERE fkUsuario = ${id}
                ORDER BY criado_em ASC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarFormasPorDia(id) {
    var instrucaoSql = `
        SELECT DATE(criado_em) AS data, COUNT(*) AS quantidade
        FROM forma
        WHERE fkUsuario = ${id}
        GROUP BY DATE(criado_em)
        ORDER BY DATE(criado_em) ASC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarFormasPorIdUsuario,
    buscarRotasPorIdUsuario,
    buscarFormasPorDia
    
}
