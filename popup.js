document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-btn');

    // Pop-up anzeigen
    popup.style.display = 'block';
    overlay.style.display = 'block';

    // Pop-up schließen
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });
});