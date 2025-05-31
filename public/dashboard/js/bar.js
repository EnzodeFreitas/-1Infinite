  const labels2 = ['Polígono criativo', 'Retângulo', 'Circunferência', 'Marcador'];

  const nomeMap = {
    'polygon': 'Polígono criativo',
    'rectangle': 'Retângulo',
    'circle': 'Circunferência',
    'marker': 'Marcador',
  };

  // Dados e configuração inicial do gráfico
  const data2 = {
    labels: labels2,
    datasets: [{
      label: 'Quantidade',
      data: [], // será preenchido depois
      borderColor: 'red',
      borderWidth: 2.5,
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
      yAxisID: 'y',
      tension: 0
    }],
  };

  const config2 = {
    type: 'bar',
    data: data2,
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: 'Ferramentas utilizadas',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Formas',
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          min: 0,
          ticks: {
            stepSize: 5,
          },
          title: {
            display: true,
            text: 'Quantidade',
          },
        },
      },
    },
  };

  // Criar o gráfico com config vazia (será preenchido depois)
  const ctx2 = document.getElementById('myChart2').getContext('2d');
  const myChart2 = new Chart(ctx2, config2);

  // Função para carregar os dados do backend
  function carregarDadosFerramentas() {
    const id = sessionStorage.ID_USUARIO;

    fetch(`/medidas/formas/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(resposta => {
        if (resposta.status === 204) return [];
        if (resposta.ok) return resposta.json();
        throw new Error('Erro na resposta do servidor: ' + resposta.status);
      })
      .then(ferramentas => {
        console.log("Dados recebidos (ferramentas):", ferramentas);

        const dadosQuantidades = labels2.map(label => {
          const item = ferramentas.find(f => nomeMap[f.ferramenta.toLowerCase()] === label);
          return item ? item.quantidade : 0;
        });

        // Atualiza os dados e redesenha o gráfico
        myChart2.data.datasets[0].data = dadosQuantidades;
        myChart2.update();
      })
      .catch(erro => console.error('Erro ao carregar dados das ferramentas:', erro));
  }

  // Chamar a função ao carregar a página
  carregarDadosFerramentas();