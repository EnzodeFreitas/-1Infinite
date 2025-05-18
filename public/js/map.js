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

// Escuta o evento draw:created que no momento que termina de desenhar algo no mapa
map.on('draw:created', function (event) {
    const layer = event.layer;
    drawnItems.addLayer(layer); // adiciona no grupo
    
    // Para posicionar o popup no centro da forma desenhada
    const latlng = layer.getBounds ? layer.getBounds().getCenter() : layer.getLatLng();

    // Cria o formulário para descrição e fotos
    const formHtml = `
        <form id="shapeInfoForm">
            <label for="shapeDescription">Descrição:</label>
            <textarea id="shapeDescription" name="description"></textarea><br><br>
            <label for="shapePhotos">Adicionar foto:</label>
            <input type="file" id="shapePhotos" name="photos" multiple><br><br>
            <button type="submit">Enviar</button>
        </form>
    `;

    const popup = L.popup()
        .setLatLng(latlng)
        .setContent(formHtml)
        .openOn(map);

    // Quando o enviar o formulário: 
    document.getElementById("shapeInfoForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const description = document.getElementById("shapeDescription").value;
        const photos = document.getElementById("shapePhotos").files;

        let photoNames = "";
        for (let i = 0; i < photos.length; i++) {
            photoNames += photos[i].name + ", ";
        }
        photoNames = photoNames.slice(0, -2); // remove última vírgula

        // Associa popup à forma com a descrição e fotos
        layer.bindPopup("Descrição: " + description + "<br>Fotos: " + (photoNames || "Nenhuma")).openPopup();

        // Convertendo para GeoJSON (ainda continua sendo JSON, porém apenas uma estrutura combinada). Precisa de biblioteca para manipular
        const geojson = layer.toGeoJSON();
        geojson.properties = {
            descricao: description,
            tipo: event.layerType,
            fotos: []
        };

        // Prepara os dados para o envio com formData
        const formData = new FormData();
        formData.append("geojson", JSON.stringify(geojson));
        for (let i = 0; i < photos.length; i++) {
            formData.append("fotos[]", photos[i]);
        }

        // Envia ao backend :)
        fetch("/api/salvar-diario", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => console.log("Salvo!", data))
            .catch(err => console.error("Erro ao salvar:", err));

        map.closePopup();
    });
});

map.on('draw:edited', function (e) {
    const layers = e.layers;
    layers.eachLayer(function (layer) {
        const geojson = layer.toGeoJSON();
        // ENVIA AO BACK
        fetch('/api/atualizar-diario', {
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
        fetch('/api/excluir-diario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(geojson)
        })
        .then(res => res.json())
        .then(data => console.log('Excluído!', data))
        .catch(err => console.error('Erro ao excluir:', err));
    });
});

