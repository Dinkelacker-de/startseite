document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');
    const menuLinks = document.querySelectorAll('.menu-item');
    
    burgerMenu.addEventListener('click', function () {
        navMenu.classList.toggle('show');
        
        // Toggle ARIA expanded state
        const expanded = burgerMenu.getAttribute('aria-expanded') === 'true';
        burgerMenu.setAttribute('aria-expanded', !expanded);
    });
    
    // Menü schließen, wenn ein Link geklickt wird
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('show');
            burgerMenu.setAttribute('aria-expanded', 'false');
        });
    });
});