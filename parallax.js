document.addEventListener("DOMContentLoaded", function () {
    const layer1 = document.querySelector(".parallax__layer__1");
    const layer2 = document.querySelector(".parallax__layer__2");
    const layer3 = document.querySelector(".parallax__layer__3");

    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY;

        // Erhöhte Multiplikatoren für schnelleres Hochscrollen
        layer1.style.transform = `translateY(${-scrollPosition * 0.6}px)`;
        layer2.style.transform = `translateY(${-scrollPosition * 0.9}px)`;
        layer3.style.transform = `translateY(${-scrollPosition * 1.2}px)`;
    });
});








