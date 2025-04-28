// Inicialização da biblioteca
const scroll = new LocomotiveScroll({
     /* el significa em qual elemento inicializar o locomotive scroll 
        Irá procurar pelo 'data-scroll-container', por isso é preciso mapeá-lo
    */
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});
   