    // EFEITO PARALLAX
    let bg = document.getElementById("bg"); // 
    let lua = document.getElementById("lua");
    let montanha = document.getElementById("montanha");
    let estrada = document.getElementById("estrada");
    let texto = document.getElementById("texto");

   scroll.on('scroll', (args) => { /* Normal seria usar 'window.addEventListener', porém a biblioteca do locomotive 
                                      scroll iria anular. Por isso, usar comando do sistema interno locomotive*/
        let value = args.scroll.y; // valor do scroll. Quando multiplicado, irá controlar a velocidade do movimento

        bg.style.top = value * 0.5 + 'px'; // Move para baixo, mais devagar que o scroll (efeito de profundidade).
        lua.style.left = -value * 0.5 + 'px'; // O sinal de - faz a lua ir pro lado oposto.
        montanha.style.top = -value * 0.15 + 'px'; // Move as montanhas bem devagar pra cima (efeito de distância) *notar o sinal -
        estrada.style.top = value * 0.15 + 'px'; // Move para baixo
        texto.style.top = value * 1 + 'px'; // Movimentação na mesma velocidade do scroll

        /*
            A posição da variável irá mudar de acordo com o valor de 'top' ou 'left'. 
            Como o valor dessas duas propriedades é calculado com base no valor do scroll, 
            as variáveis (que são imagens) irão se mover conforme o usuário rola a página. 

            px é a unidade de medida para as
        */


    })