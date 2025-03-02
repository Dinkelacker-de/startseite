document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, a, div.button:not(nav *)");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.style.transition = "opacity 1s ease-out, transform 1s ease-out";
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        observer.observe(element);
    });
});
