const year = new Date().getFullYear();
const width = 1000, height = 150, cellSize = 17;
const svg = d3.select("#heatmap").append("svg")
    .attr("width", width)
    .attr("height", height);
const g = svg.append("g").attr("transform", "translate(40,20)");
const color = d3.scaleQuantize()
    .domain([0, 10]) // Ajuste esse domínio depois que tiver dados reais
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
});
