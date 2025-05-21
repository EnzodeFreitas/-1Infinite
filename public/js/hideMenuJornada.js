function hideMenuJornada() {
    var menuIcon = document.getElementById("menu-icon");
    menu.classList.toggle("hidden");

 
 // Alternar o ícone
 if (menu.classList.contains("hidden")) {
     menuIcon.classList.remove("bx-x");
     menuIcon.classList.add("bx-menu");
 } else {
     menuIcon.classList.remove("bx-menu");
     menuIcon.classList.add("bx-x");
 }
}