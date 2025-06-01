function hideMenuJornada() {
    var menu = document.querySelector(".menu");
    var menuIcon = document.getElementById("menu-icon");

    if (menu && menuIcon) {
        menu.classList.toggle("hidden");
        
        if (menu.classList.contains("hidden")) {
            menuIcon.classList.remove("bx-x");
            menuIcon.classList.add("bx-menu");
        } else {
            menuIcon.classList.remove("bx-menu");
            menuIcon.classList.add("bx-x");
        }
    }
}