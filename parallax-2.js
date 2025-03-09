window.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;
    let parallaxElement = document.querySelector(".parallax-2");

    if (parallaxElement) {
        parallaxElement.style.transform = `translateY(${scrollPosition * 0.2}px)`; // Weniger Bewegung für langsameren Effekt
    }
});
