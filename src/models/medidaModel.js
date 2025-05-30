var database = require("../database/config");

function buscarFormas(id) {
    var instrucaoSql = `
        SELECT tipo_ferramenta AS ferramenta,
               COUNT(*) AS quantidade
        FROM ferramentas_uso
        WHERE fkUsuario = ${id}
        GROUP BY tipo_ferramenta
        ORDER BY FIELD(tipo_ferramenta, 'Rota', 'Polígono criativo', 'Retângulo', 'Circunferência', 'Marcador', 'Marcador em Área')
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRotas(id) {
    var instrucaoSql = `
        SELECT 
            CASE 
                WHEN distancia_total BETWEEN 0 AND 1 THEN '0–1 km'
                WHEN distancia_total > 1 AND distancia_total <= 2 THEN '1–2 km'
                WHEN distancia_total > 2 AND distancia_total <= 3 THEN '2–3 km'
                WHEN distancia_total > 3 AND distancia_total <= 4 THEN '3–4 km'
                WHEN distancia_total > 4 AND distancia_total <= 5 THEN '4–5 km'
            END AS faixa_distancia,
            COUNT(*) AS quantidade_rotas
        FROM rotas
        WHERE fkUsuario = ${id}
        GROUP BY faixa_distancia
        ORDER BY faixa_distancia;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarIntensidade(id) {
    var instrucaoSql = `
        SELECT data, SUM(quantidade) AS quantidade_total FROM (
            SELECT DATE(criado_em) AS data, COUNT(*) AS quantidade
            FROM rota
            WHERE fkUsuario = ${id}
            GROUP BY DATE(criado_em)

            UNION ALL

            SELECT DATE(criado_em) AS data, COUNT(*) AS quantidade
            FROM forma
            WHERE fkUsuario = ${id}
            GROUP BY DATE(criado_em)
        ) AS sub
        GROUP BY data
        ORDER BY data;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarFormas,
    buscarRotas,
    buscarIntensidade
}
