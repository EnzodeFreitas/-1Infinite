    // Botão que abre a ajuda ("?")
    const ajudaBtn = document.getElementById('ajudaBtn');

    // Caixa que contém todo o conteúdo da ajuda (a modal)
    const caixaAjuda = document.getElementById('caixaAjuda');

    // "X" que fecha a caixa de ajuda
    const fecharAjuda = document.getElementById('fecharAjuda');


    // Quando clicar no botão de ajuda...
    ajudaBtn.onclick = () => {
        // ...irá exibir a caixa de ajuda, alterando o estilo para "block" (visible)
      caixaAjuda.style.display = 'block';
    };

    // Quando clicar no "X"...
    fecharAjuda.onclick = () => {
        // // ...irá esconder a caixa de ajuda, alterando o estilo para "none" (invisible)
      caixaAjuda.style.display = 'none';
    };


    // Quando clicar fora do conteudoAjuda
    window.onclick = (event) => {
        // ...se o clique for na caixa de fundo (caixaAjuda), a caixa de ajuda será escondida
      if (event.target === caixaAjuda) {
        caixaAjuda.style.display = 'none';
      }
    };