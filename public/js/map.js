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

    // ===== CRIANDO O MAPA =====
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

    // OpenStreetMap (camada base) para a seleção do mapa, para exibí-lo
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

    }).addTo(map); // Adiciona o layer no mapa (VARIÁVEL, não no identificador da div)

    // Marcador inicial
    L.marker([0, 0]).addTo(map)
        .bindPopup('Centro do mapa - Ponto (0, 0)')
        .openPopup();

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
        var lat = e.latlng.lat; // latitude onde clicou
        var lon = e.latlng.lng; // longitude  "    "

        // Popup com formulário para adicionar descrição ou foto
        // Diferentemente do id, o name é usado para criar pares de chave-valor para o envio dos dados.
        var formHtml = `
                <form id="infoForm">
                    <label for="description">Descrição:</label>
                    <textarea id="description" name="description"></textarea><br><br>
                    <label for="photos">Adicionar foto:</label>
                    <input type="file" id="photos" name="photos" multiple><br><br>
                    <button type="submit">Enviar</button>
                </form>
            `;

        var popup = L.popup()
            .setLatLng(e.latlng) // Define a posição onde o popup aparecerá (quando o usuário clicou)
            .setContent(formHtml) // Formulário definido anteriormente
            .openOn(map); // Abre o formulário

        // Envio do formulário
        document.getElementById("infoForm").addEventListener("submit", function (event) { /* Quando botão de enviar 
                                                                                            for clicado, essa função 
                                                                                            será executada */

            event.preventDefault(); // Como de costume recarregar a página após o envio, essa função bloqueia isso

            var description = document.getElementById("description").value;
            var photos = document.getElementById("photos").files;

            // Percorre as fotos e cria uma string 
            var photoNames = "";
            for (let i = 0; i < photos.length; i++) {
                photoNames += photos[i].name + ", "; // Adiciona o nome da foto à string
            }

            // Remove a última vírgula e espaço extra
            photoNames = photoNames.slice(0, -2);

            // Nomes das fotos
            alert("Descrição: " + description + "\nFotos: " + (photoNames ? photoNames : "Nenhuma foto selecionada"));

            // Marcador no mapa
            L.marker([lat, lon]).addTo(map)
                .bindPopup("Descrição: " + description + "<br>Fotos: " + (photoNames ? photoNames : "Nenhuma foto"))
                .openPopup();
        });
    });

    // Escuta o evento draw:created que no momento que termina de desenhar algo no mapa
    map.on('draw:created', function (event) {
        var layer = event.layer; // event.layer = forma desenhada
        drawnItems.addLayer(layer); // adiciona essa forma ao mapa
    });