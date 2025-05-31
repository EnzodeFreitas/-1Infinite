
function carregarDados() {
    const id = sessionStorage.ID_USUARIO;
    fetch(`/medidas/rotas/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(function (resposta) {
            console.log("Resposta da API:", resposta);

            if (resposta.status === 204) {

                return [];
            }

            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error('Erro na resposta do servidor: ' + resposta.status);
            }
        })
        .then(function (rotas) {
            console.log("Dados recebidos:", rotas);
            
            const labels = rotas.map(r => r.criado_em);
            const distancias = rotas.map(r => r.distancia_km);

            const dados = {
                labels: labels,
                datasets: [{
                    label: 'Distância (km)',
                    data: distancias,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.3,
                }]
            };

            const config = {
                type: 'line',
                data: dados,
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',                     
                                tooltipFormat: 'dd LLL yyyy',   // (ex: 31 Mai 2025)
                                displayFormats: {
                                    day: 'dd LLL yyyy'  
                                }
                            },
                            ticks: {
                                autoSkip: false, // Sem pular tickets
                                maxRotation: 0, // Sem rotação nos textos
                                minRotation: 0,
                            },
                            title: {
                                display: true,
                                text: 'Data',
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Distância (km)',
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Evolução da Distância por Data',
                    }
                }
            }
        };

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, config);
})
        .catch (function (erro) {
    console.error('Erro ao carregar dados das rotas:', erro);
});
}

carregarDados();