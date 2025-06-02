const year = new Date().getFullYear();
const width = 1000, height = 180, cellSize = 17;
const svg = d3.select("#heatmap").append("svg")
    .attr("width", width)
    .attr("height", height);
const g = svg.append("g").attr("transform", "translate(40,20)");
const color = d3.scaleQuantize()
    .domain([1, 3, 5, 8]) // Range de cores
    .range(["#050f1a", "#c6e48b", "#7bc96f", "#239a3b", "#196127"]);
const dayLabels = ["D", "S", "T", "Q", "Q", "S", "S"];
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

g.selectAll(".day-label")
    .data(dayLabels)
    .join("text")
    .attr("class", "day-label")
    .attr("x", -5)
    .attr("y", (d, i) => i * cellSize + 12)
    .attr("text-anchor", "end")
    .text(d => d);

g.selectAll(".month-label")
    .data(d3.timeMonths(new Date(year, 0, 1), new Date(year + 1, 0, 1)))
    .join("text")
    .attr("class", "month-label")
    .attr("x", d => d3.timeWeek.count(d3.timeYear(d), d) * cellSize)
    .attr("y", -5)
    .text(d3.timeFormat("%b"));

const allDates = d3.timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1));
let heatmapData = allDates.map(d => ({ date: d, value: 0 }));

function formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function desenharLegenda() {
    const legendData = [
        { label: "1–2", color: "#c6e48b" },
        { label: "3–4", color: "#7bc96f" },
        { label: "5–7", color: "#239a3b" },
        { label: "8+", color: "#196127" }
    ];

    const legendItemWidth = 70;
    const totalLegendWidth = legendData.length * legendItemWidth;
    const startX = (width - totalLegendWidth) / 2;

    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${startX}, ${height - 40})`);

    legend.selectAll("rect")
        .data(legendData)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * legendItemWidth)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", d => d.color);

    legend.selectAll("text")
        .data(legendData)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * legendItemWidth + 25)
        .attr("y", 15)
        .text(d => d.label)
        .style("font-size", "12px")
        .style("alignment-baseline", "middle")
        .style("fill", "#767676");
}

function updateHeatmap() {
    g.selectAll("rect.day")
        .data(heatmapData, d => formatDate(d.date))
        .join(
            enter => enter.append("rect")
                .attr("class", "day")
                .attr("width", cellSize)
                .attr("height", cellSize)
                .attr("x", d => d3.timeWeek.count(d3.timeYear(d.date), d.date) * cellSize)
                .attr("y", d => d.date.getDay() * cellSize)
                .attr("fill", d => color(d.value))
                .on("mouseover", (event, d) => {
                    tooltip.transition().duration(200).style("opacity", 0.9);
                    tooltip.html(`${formatDate(d.date)}<br/>${d.value} atividades`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 20) + "px");
                })
                .on("mouseout", () => {
                    tooltip.transition().duration(500).style("opacity", 0);
                }),
            update => update.transition().duration(300).attr("fill", d => color(d.value))
        );
}



// Coleta dos dados
function carregarDadosHeatmap() {
    const id = sessionStorage.ID_USUARIO;
    console.log("Carregando heatmap...")
    Promise.all([
        fetch(`/medidas/rotas/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.ok ? res.json() : []),
        fetch(`/medidas/formas/por-dia/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.ok ? res.json() : [])
    ])
        .then(([rotas, formasPorDia]) => {
            console.log("Rotas:", rotas);
            console.log("Formas por dia:", formasPorDia);

            const mapaData = {};

            // Contando rotas por dia
            rotas.forEach(r => {
                if (r && r.criado_em) {
                    const dataFormatada = r.criado_em.split('T')[0];
                    mapaData[dataFormatada] = (mapaData[dataFormatada] || 0) + 1;
                }
            });

            // Usando resultado agrupado de formas por data
            formasPorDia.forEach(f => {
                const dataFormatada = formatDate(new Date(f.data));
                mapaData[dataFormatada] = (mapaData[dataFormatada] || 0) + f.quantidade;
            });

            // Atualizando o heatmapData com soma das rotas e formas
            heatmapData = heatmapData.map(d => {
                const key = formatDate(d.date);
                return { date: d.date, value: mapaData[key] || 0 };
            });

            // Atualizando o domínio do color scale
            const maxValor = d3.max(heatmapData, d => d.value);
            color.domain([0, maxValor || 10]);

            updateHeatmap();
        })
        .catch(erro => console.error('Erro ao carregar dados para heatmap:', erro));

}

document.addEventListener("DOMContentLoaded", () => {
    carregarDadosHeatmap();
    desenharLegenda()
});
