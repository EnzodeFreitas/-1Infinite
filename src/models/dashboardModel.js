var database = require("../database/config")

function exibirGraficoHeatmap(id) {
    var instrucaoSql = `
        SELECT f.geojson
        FROM forma f
        JOIN mapa m ON f.fkMapa = m.id
        WHERE m.fkUsuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function exibirGraficoBarra(id) {
    var instrucaoSql = `
        SELECT 
            CASE 
                WHEN distancia_km <= 1 THEN '0-1km'
                WHEN distancia_km <= 2 THEN '1-2km'
                WHEN distancia_km <= 3 THEN '2-3km'
                WHEN distancia_km <= 4 THEN '3-4km'
                WHEN distancia_km <= 5 THEN '4-5km'
                ELSE 'Mais de 5km'
            END AS faixa_distancia,
            COUNT(*) AS quantidade
        FROM rota r
        JOIN mapa m ON r.fkMapa = m.id
        WHERE m.fkUsuario = ${id}
        GROUP BY faixa_distancia
        ORDER BY faixa_distancia;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function exibirGraficoLinha(id) {
    var instrucaoSql = `
        SELECT DATE(r.criado_em) AS data, COUNT(*) AS total_rotas
        FROM rota r
        JOIN mapa m ON r.fkMapa = m.id
        WHERE m.fkUsuario = ${id}
        GROUP BY DATE(r.criado_em)
        ORDER BY DATE(r.criado_em);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = { exibirGraficoHeatmap, exibirGraficoBarra, exibirGraficoLinha };

