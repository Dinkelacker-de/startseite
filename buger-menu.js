document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');
    const menuLinks = document.querySelectorAll('.menu-item');

    burgerMenu.addEventListener('click', function () {
        navMenu.classList.toggle('show');
        burgerMenu.classList.toggle('active'); // Ändert das Icon zu "X"
        
        // Toggle ARIA expanded state
        const expanded = burgerMenu.getAttribute('aria-expanded') === 'true';
        burgerMenu.setAttribute('aria-expanded', !expanded);
    });

    // Menü schließen, wenn ein Link geklickt wird
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('show');
            burgerMenu.classList.remove('active'); // Zurück zum Burger-Icon
            burgerMenu.setAttribute('aria-expanded', 'false');
        });
    });
});
