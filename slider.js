document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider-wm .track");
    const originalTrack = slider.innerHTML;

    // **Mehr Klone erzeugen (z. B. 3-fach)**
    for (let i = 0; i < 3; i++) { // Erhöhen auf 2 oder mehr, je nach Bedarf
        slider.innerHTML += originalTrack;
    }

    let slideWidth = slider.scrollWidth / 3; // 1/3 der Gesamtbreite ist der Original-Track
    let currentPosition = 0;

    function moveSlider() {
        currentPosition -= 1;
        slider.style.transform = `translateX(${currentPosition}px)`;
        slider.style.transition = "transform 0.02s linear";

        // Sobald ein ganzer Original-Track durch ist, zurücksetzen
        if (Math.abs(currentPosition) >= slideWidth) {
            slider.style.transition = "none"; // Sofortiger Reset
            currentPosition = 0;
            slider.style.transform = `translateX(${currentPosition}px)`;

            requestAnimationFrame(() => {
                slider.style.transition = "transform 0.02s linear";
            });
        }
    }

    function startSlider() {
        setInterval(moveSlider, 20);
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
});
