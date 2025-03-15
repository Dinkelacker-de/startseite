document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider-ig .track");
    const originalTrack = slider.innerHTML;

    // **Mehr Klone erzeugen (z. B. 3-fach)**
    for (let i = 0; i < 2; i++) { // Erhöhen auf 2 oder mehr, je nach Bedarf
        slider.innerHTML += originalTrack;
    }

    let slideWidth = slider.scrollWidth / 3; // 1/3 der Gesamtbreite ist der Original-Track
    let currentPosition = 0;
    let animationFrame;
    let isResetting = false; // Verhindert direktes Weiterscrollen nach Reset

    function moveSlider() {
        if (isResetting) return; // Stoppe Bewegung kurzzeitig beim Reset

        currentPosition -= 1;
        slider.style.transform = `translate3d(${currentPosition}px, 0, 0)`;

        if (Math.abs(currentPosition) >= slideWidth) {
            isResetting = true; // Verhindert visuelles Springen
            setTimeout(() => {
                slider.style.transition = "none";
                currentPosition = 0;
                slider.style.transform = `translate3d(0, 0, 0)`;
                isResetting = false; // Nach Reset wieder weiterlaufen
            }, 16); // Kleiner Delay für flüssigen Übergang
        }

        animationFrame = requestAnimationFrame(moveSlider);
    }

    function startSlider() {
        if (!animationFrame) {
            moveSlider();
        }
    }

    function stopSlider() {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }

    // **Preload-Bilder, um sicherzustellen, dass alles geladen ist**
    function preloadImages() {
        const images = slider.querySelectorAll("img");
        let loadedCount = 0;

        images.forEach(img => {
            if (img.complete) {
                loadedCount++;
            } else {
                img.addEventListener("load", () => {
                    loadedCount++;
                    if (loadedCount === images.length) {
                        startSlider();
                    }
                });
            }
        });

        if (loadedCount === images.length) {
            startSlider();
        }
    }

    preloadImages();

    slider.addEventListener("mouseenter", stopSlider);
    slider.addEventListener("mouseleave", startSlider);
});
