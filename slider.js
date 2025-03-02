document.addEventListener("DOMContentLoaded", function () {
    const banner = document.querySelector(".wrapper.banner"); // Nur diesen Bereich auswählen
    const track = banner.querySelector(".track"); // Track innerhalb der Banner-Sektion
    const slides = Array.from(track.children); // Nur die originalen Slides verwenden
    const slideWidth = slides[0].offsetWidth + 20; // Breite + Abstand zwischen Slides

    // Originale Slides klonen, um den Loop-Effekt zu ermöglichen
    slides.forEach(slide => {
        let clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    let position = 0;
    let speed = 1; // Geschwindigkeit des Sliders

    function moveSlider() {
        position -= speed;
        track.style.transform = `translateX(${position}px)`;

        // Prüfen, ob das erste Slide komplett aus dem sichtbaren Bereich ist
        const firstSlide = track.firstElementChild;
        if (firstSlide.getBoundingClientRect().right <= banner.getBoundingClientRect().left) {
            track.appendChild(firstSlide); // Bild ans Ende setzen
            position += slideWidth; // Position anpassen für sanften Übergang
            track.style.transform = `translateX(${position}px)`;
        }

        requestAnimationFrame(moveSlider);
    }

    moveSlider();
});
