    // EFEITO PARALLAX
    let bg = document.getElementById("bg"); // 
    let lua = document.getElementById("lua");
    let montanha = document.getElementById("montanha");
    let estrada = document.getElementById("estrada");
    let texto = document.getElementById("texto");

        /*
            A posição da variável irá mudar de acordo com o valor de 'top' ou 'left'. 
            Como o valor dessas duas propriedades é calculado com base no valor do scroll, 
            as variáveis (que são imagens) irão se mover conforme o usuário rola a página. 
        */


   scroll.on('scroll', (args) => { /* Normal seria usar 'window.addEventListener', porém a biblioteca do locomotive 
                                      scroll iria anular. Por isso, usar comando do sistema interno locomotive*/
        let value = args.scroll.y; // valor do scroll. Quando multiplicado, irá controlar a velocidade do movimento

        /* O sinal de - faz o elemento ir ao lado oposto. */
        bg.style.top = -value * 0.5 + 'px'; // Move para cima, mais devagar que o scroll (efeito de profundidade). 
        texto.style.left = value * 1 + 'px'; // Movimentação na mesma velocidade do scroll
        lua.style.left = `calc(75% - ${value * 0.5}px)`; // Em relação à posição css do id: lua
        montanha.style.top = value * 0.15 + 'px'; // Move as montanhas bem devagar pra baixo 
        montanha_direita.style.top=  value * 0.15 + 'px'; // Camada para esconder o texto (mesma velocidade que motanha original) 
    })