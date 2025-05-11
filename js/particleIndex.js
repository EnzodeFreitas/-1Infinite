particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 100, /* Quantidade de partículas*/
        "density": {
          "enable": true,
          "value_area": 800 /* Dispersão entre elas */
        }
      },
      "color": {
        "value": "#c0c0c0"
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.6, /* Opacidade média */
        "random": true /* Cada partícula tem opacidade aleatória de 0 a 1*/
      },
      "size": {
        "value": 2,
        "random": true
      },
      "line_linked": {
        "enable": false /* Linhas que conectam as partículas */
      },
      "move": {
        "enable": true, /* Ativa o movimento delas*/
        "speed": 0.4,
        "direction": "none", /* Sem direção fixa */
        "random": true, 
        "straight": false, /* Não será em linha reta, mas com pequenas curvas ou mudanças de direção */
        "out_mode": "out" /* Quando uma partícula sair da tela, reaparece do lado oposto para manter o fluxo*/
      }
    },
    "interactivity": {
      "detect_on": "window", /* Na área desenhada das partículas */
      "events": {
        "onhover": {
          "enable": false, /* Desativa a interação */
          "mode": "grab"
        },
        "onclick": {
          "enable": true, /* Desativa a explosão ao clicar nas partículas*/
          "mode": "repulse"
        },
        "resize": true /* Se reajustam automaticamente ao redimensionar a tela */
      }
    },
    "retina_detect": true /* Deteção de telas com bastante densidade de pixels (retina) */
  });