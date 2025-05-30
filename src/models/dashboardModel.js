var database = require("../database/config");

function exibirGraficoHeatmap(id) {
    const instrucaoSql = `
        SELECT geojson
        FROM forma
        WHERE fkUsuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function exibirGraficoBarra(id) {
    const instrucaoSql = `
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
        FROM rota
        WHERE fkUsuario = ${id}
        GROUP BY faixa_distancia
        ORDER BY faixa_distancia;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function exibirGraficoLinha(id) {
    const instrucaoSql = `
        SELECT DATE(criado_em) AS data, COUNT(*) AS total_rotas
        FROM rota
        WHERE fkUsuario = ${id}
        GROUP BY DATE(criado_em)
        ORDER BY DATE(criado_em);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvarRota(geojson, distancia_km, descricao, fkUsuario) {
    const instrucaoSql = `
        INSERT INTO rota (geojson, distancia_km, descricao, fkUsuario)
        VALUES ('${JSON.stringify(geojson)}', ${distancia_km}, '${descricao}', ${fkUsuario});
    `;
    console.log("Executando SQL para salvar rota:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvarForma(geojson, tipo, descricao, fkUsuario) {
    const instrucaoSql = `
        INSERT INTO forma (geojson, tipo, descricao, fkUsuario)
        VALUES ('${JSON.stringify(geojson)}', '${tipo}', '${descricao}', ${fkUsuario});
    `;
    console.log("Executando SQL para salvar forma:", instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { 
    exibirGraficoHeatmap, 
    exibirGraficoBarra, 
    exibirGraficoLinha, 
    salvarRota,
    salvarForma 
};
