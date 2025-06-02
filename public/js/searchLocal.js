    function buscarLocalizacao() {
    const input = document.getElementById("searchInput").value.trim();  /* 
    Remove os espaços antecedentes e posteriores do conteúdo digitado para não haver confusão. 
    Por exemplo " -23.558082, -46.661727  ".trim() = "-23.558082, -46.661727", 
    "   Rua Haddock Lobo 595 (São Paulo - Sp), São Paulo, SP, 01414-905   " =
    "Rua Haddock Lobo 595 (São Paulo - Sp), São Paulo, SP, 01414-905"
    */

    // SE coordenada:
    const coordRegex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;
    /* Regex -
    padrões de caracteres que associam sequências de caracteres de texto
    - para verificar se foi digitado no formato como "-23.558082, -46.661727"
    */
    if (coordRegex.test(input)) { /* .test() é uma função para testar se um texto(string) combina
        com o regex */
        const [lat, lon] = input.split(",").map(coord => parseFloat(coord.trim()));
        /* Divide com ','e converte para float */
        map.setView([lat, lon], 13); // Centraliza o mapa com zoom 13
        L.marker([lat, lon]).addTo(map)
            .bindPopup(`Coordenadas: ${lat}, ${lon}`)
            .openPopup(); // Cria o marcador, mostrando o popup com as coordenadas
    } else {
        // SE NÃO, então é nome. Logo usa o Nominatim (OpenStreetMap)
        /* Busca pela API para busca do lugar digitado :) */
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) { /* Resposta convertida para JSON, verifricando se encontrou reusltado*/
                    // Coordenadas do primeiro reusltado
                    const lat = parseFloat(data[0].lat); 
                    const lon = parseFloat(data[0].lon);
                    map.setView([lat, lon], 13);
                    L.marker([lat, lon]).addTo(map)
                        .bindPopup(`Local: ${data[0].display_name}`)
                        .openPopup(); // Cria o marcador, mostrando o popup (como acima), porém com o nome completo do local
                } else {
                    alert("Local não encontrado."); // Caso não encontre 
                }
            })
            .catch(error => {
                console.error("Erro ao buscar local:", error);
                alert("Erro na busca. Tente novamente.");
            }); 
    }
}