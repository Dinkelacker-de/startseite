// Tür-Daten (Bild + Text)
const doorDetails = {
  1: {  text: "#12312", img: "asset/baum-gelb-1.svg" },
  2: {  text: "#73427", img: "asset/baum-rot-1.svg" },
  3: {  text: "#21353", img: "asset/bier-rot-1.svg" },
  4: {  text: "#12312", img: "asset/bier-rot-2.svg" },
  5: {  text: "#73427", img: "asset/bier-rot-1.svg" },
  6: {  text: "#21353", img: "asset/baum-gelb-1.svg" },
  7: {  text: "#12312", img: "asset/bier-rot-1.svg" },
  8: {  text: "#73427", img: "asset/kugel-gelb-2.svg" },
  9: {  text: "#21353", img: "asset/kugel-rot-1.svg" },
  10: {  text: "#12312", img: "asset/kugel-gelb-2.svg" },
  11: {  text: "#73427", img: "asset/baum-rot-1.svg" },
  12: {  text: "#21353", img: "asset/baum-rot-1.svg" },
  13: {  text: "#12312", img: "asset/baum-gelb-1.svg" },
  14: {  text: "#73427", img: "asset/bier-rot-2.svg" },
  15: {  text: "#21353", img: "asset/bier-rot-1.svg" },
  16: {  text: "#12312", img: "asset/bier-gleb-2.svg" },
  17: {  text: "#73427", img: "asset/bier-rot-1.svg" },
  18: {  text: "#21353", img: "asset/bier-gleb-2.svg" },
  19: {  text: "#21353", img: "asset/kugel-rot-2.svg" },
  20: {  text: "#21353", img: "asset/asset/bier-rot-1.svg" },
  21: {  text: "#21353", img: "asset/bier-rot-2.svg" },
  22: {  text: "#21353", img: "asset/bier-gleb-2.svg" },
  23: {  text: "#21353", img: "asset/baum-rot-1.svg" },
  24: {  text: "#21353", img: "asset/bier-rot-1.svg" },
};

// Funktion zum Öffnen des Popups
function openPopup(doorNumber) {
  const popup = document.getElementById("popup-door");
  const img = document.getElementById("popup-door-img");
  const text = document.getElementById("popup-door-text");

  // Update Inhalte basierend auf der Tür-Nummer
  img.src = doorDetails[doorNumber].img;
  text.textContent = doorDetails[doorNumber].text;

  // Setze die Tür-spezifische Klasse im Popup
  popup.classList = `popup-door door-${doorNumber}`;

  // Popup anzeigen
  popup.style.display = "flex";
}

// Funktion zum Schließen des Popups
function closePopup() {
  document.getElementById("popup-door").style.display = "none";
}

document.getElementById("popup-door").addEventListener("click", function(event) {
  if (!document.querySelector(".popup-door-content").contains(event.target)) {
      closePopup();
  }
});