// ===== CRIAÇÃO DO MAPA =====
var map = L.map('map', { // "L" - representa todo o objeto Leaflet. Ponto de acesso para usar os recursos da biblioteca
    // - do laeflet e função map(); 'map' dentro da função map é o identificador da div no hmtl 
    center: [0, 0],  // Centraliza o mapa no ponto de coordenadas (0,0)
    zoom: 2,  // inicial
    minZoom: 2,  // Limite mínimo (evita muita distância)
    maxZoom: 19,  // Limite máximo
    maxBounds: [ // "Trava" o mapa dentro de limites máximos ao usuário (impossibilita o arrastar desenfreado).
        // A latitude varia de -90° no Pólo Sul a 90° no Pólo Norte, com 0° no Equador. A longitude varia de -180° a 180°
        // Longitude: oeste (-) leste (+); latitude: norte (+) sul (-)
        [-90, -180],  // Limites geográficos inferior (latitude: sul, longitude: oeste)
        [90, 180]  // Limites geográficos superior (latitude: norte, longitude: leste)
    ],
    zoomControl: true  // Botões de zoom + e -

});

map.whenReady(() => {
    // Traduz as legendas da ferramenta de zoom
    map.zoomControl._zoomInButton.title = "Aumentar zoom";
    map.zoomControl._zoomOutButton.title = "Diminuir zoom";
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {}).addTo(map);

L.marker([0, 0]).addTo(map)
    .bindPopup('Centro do mapa - Ponto (0, 0)')
    .openPopup();


// ===== LOCALIZAÇÃO ATUAL =====
if (navigator.geolocation) { // API nativa do navegador
    navigator.geolocation.getCurrentPosition(function (position) { // Parâmetro 1, quando bem sucedida a função
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        /* 
        Foca o mapa na localização do usuário
         map.setView([lat, lon], 13); o número é o zoom inicial. 
         Exemplo map.setView([-47.0, -71.0], 5); Patagônia
         */

        // Marcador na localização
        L.marker([lat, lon]).addTo(map)
            .bindPopup('Você está aqui!') // Anexa o popup ao marcador
            .openPopup(); // Abre o popup, sem essa função o usuário teria que clicar para aparecer o popup

    }, function (error) { // Parâmetro 2, quando malsucedida
        console.error('Erro ao obter localização:', error); // Erro apenas no console
        alert('Não foi possível acessar sua localização.');
    });
} else {
    alert('Seu navegador não suporta geolocalização.');
}

// ===== CAMADAS =====

// FeatureGroup (camada) para armazenar marcadores e rotas desenhadas, agrupa múltiplos objetos
var drawnItems = new L.FeatureGroup(); /*  Agrupa e gerencia vários objetos geográficos no mapa: 
                                           Adicionando, removendo ou editando. Esses itens serão armazenados 
                                           na função FeatureGroup dando a oportunidade de evento ao clicar
                                           Resumo: Caixa para todas as formas desenahdas no mapa*/
map.addLayer(drawnItems);

// Dados das rotas por faixa de distância
let dadosRotas = [0, 0, 0, 0, 0]; // 0–1km, 1–2km, ..., 4–5km

// Cálculo da distância de uma rota (Polyline)
function calcularDistancia(rota) {
    let distancia = 0;
    const pontos = rota.getLatLngs();
    for (let i = 0; i < pontos.length - 1; i++) {
        distancia += pontos[i].distanceTo(pontos[i + 1]) / 1000; // metros → km
    }
    return distancia;
}

// Processa as rotas desenhadas e atualiza o gráfico
function processarDistanciasEDesenharGrafico() {
    dadosRotas = [0, 0, 0, 0, 0]; // vai zerar antes de recalcular

    drawnItems.eachLayer(function (layer) {
        if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
            const distancia = calcularDistancia(layer);

            if (distancia <= 1) {
                dadosRotas[0]++;
            } else if (distancia <= 2) {
                dadosRotas[1]++;
            } else if (distancia <= 3) {
                dadosRotas[2]++;
            } else if (distancia <= 4) {
                dadosRotas[3]++;
            } else if (distancia <= 5) {
                dadosRotas[4]++;
            }
        }
    });

    // Atualiza os dados no gráfico
    myChart.data.datasets[0].data = dadosRotas;
    myChart.update();

    alert("Gráfico de rotas atualizado com sucesso!");
}

// Evento do "Botão" <a>



// Controles para desenhar no mapa (rotas e formas)
var drawControl = new L.Control.Draw({ /* L.Control.Draw é um controle de interface de usuário que irá 
                                           adicionar as ferrementas interativas no mapa e permitir ao usuário
                                           desenhar os objetos no mapa. 
                                           FeatureGroup armazena as formas des
                                           enhadas e
                                           L.Control.Draw fornece as ferramentas para isso 
                                           
                                           drawControl permite que o usuário desenhe, enquanto que o drawnItens
                                           vai manter e organizar os itens desenhados
                                           */

    edit: {
        featureGroup: drawnItems // Indica ao L.Control.Draw que qualquer forma desenhada ou editada será adicionada aqui
    },
    draw: {
        polygon: true,
        circle: true,
        rectangle: true,
        marker: true,
        polyline: true // Permite desenhar apenas linhas (rotas)
    }
});
map.addControl(drawControl);

// Evento ao clicar
map.on('click', function (e) {
    L.popup()
        .setLatLng(e.latlng) // Onde foi clicado
        .setContent(`Coordenadas:<br>Lat: ${e.latlng.lat.toFixed(5)}<br>Lng: ${e.latlng.lng.toFixed(5)}`)
        .openOn(map);
});

// Escuta o evento draw:created  no momento que termina de desenhar algo no mapa
map.on('draw:created', function (event) {
    const layer = event.layer;
    drawnItems.addLayer(layer); // Adiciona no grupo

    // Posiciona o popup no centro da forma desenhada
    // const latlng = layer.getBounds ? layer.getBounds().getCenter() : layer.getLatLng();

    // Apenas mostra popup pedindo para clicar no botão salvar depois
    // const popup = L.popup()
    //  .setLatLng(latlng)
    // .openOn(map);
});


map.on('draw:edited', function (e) {
    const layers = e.layers;
    layers.eachLayer(function (layer) {
        const geojson = layer.toGeoJSON();
        // ENVIA AO BACK
        fetch('/atualizar-diario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(geojson)
        })
            .then(res => res.json())
            .then(data => console.log('Atualizado!', data))
            .catch(err => console.error('Erro ao atualizar:', err));
    });
});

map.on('draw:deleted', function (e) {
    const layers = e.layers;
    layers.eachLayer(function (layer) {
        const geojson = layer.toGeoJSON();
        // ENVIA AO BACKEND
        fetch('/excluir-diario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(geojson)
        })
            .then(res => res.json())
            .then(data => console.log('Excluído!', data))
            .catch(err => console.error('Erro ao excluir:', err));
    });
});

function getTipoDaLayer(layer) {
    if (layer instanceof L.Marker) return "marker";
    if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) return "polyline";
    if (layer instanceof L.Polygon) return "polygon";
    if (layer instanceof L.Circle) return "circle";
    if (layer instanceof L.Rectangle) return "rectangle";
    return "unknown";
}

document.getElementById("btnSalvarFerramentas").addEventListener("click", async function (e) {
    e.preventDefault();

    if (!drawnItems) { // Local onde está as ferramentas
        alert("Nenhuma forma para salvar!");
        return;
    }

    const id = sessionStorage.ID_USUARIO;
    const layers = drawnItems.getLayers();

    for (const layer of layers) {
        const tipo = getTipoDaLayer(layer); // Função para identificar os tipos de forma.
        const geojson = layer.toGeoJSON();
        const descricao = prompt(`Descrição para o item do tipo ${tipo}?`) || "";

        if (tipo === "polyline") {
            // Salva a ROTA
            console.log("Enviando dados:", {
                geojson,
                tipo,
                descricao,
                id
            });
            await fetch("/dashboard/salvar-rota", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    geojson,
                    distancia_km: calcularDistancia(layer),
                    descricao,
                    id
                })
            });
        } else {
            // Salva A FORMA
            await fetch("/dashboard/salvar-forma", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    geojson,
                    tipo,
                    descricao,
                    id
                })
            });
        }
    }

    alert("Todas as formas e rotas foram salvas!");
});
