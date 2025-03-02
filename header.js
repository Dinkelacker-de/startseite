// Add the scroll event listener
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    // Check if the page has been scrolled down by more than 50px
    if (window.scrollY > 50) {
        header.classList.add('scrolled'); // Add class when scrolled
    } else {
        header.classList.remove('scrolled'); // Remove class when back at the top
    }
});
