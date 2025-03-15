document.addEventListener("DOMContentLoaded", function () {
  const doors = document.querySelectorAll(".door");

  const positionsLarge  = [
    { x: "15%", y: "10%" },  // Tür 1
    { x: "40%", y: "10%" },  // Tür 2
    { x: "70%", y: "10%" },  // Tür 3
    { x: "10%", y: "35%" },  // Tür 4
    { x: "50%", y: "35%" },  // Tür 5
    { x: "80%", y: "35%" },  // Tür 6
    { x: "25%", y: "52%" },  // Tür 7
    { x: "55%", y: "60%" },  // Tür 8
    { x: "85%", y: "60%" },  // Tür 9
    { x: "23%", y: "85%" },  // Tür 10
    { x: "33%", y: "62%" },  // Tür 11
    { x: "75%", y: "85%" },  // Tür 12
    { x: "30%", y: "20%" },  // Tür 13
    { x: "60%", y: "20%" },  // Tür 14
    { x: "90%", y: "20%" },  // Tür 15
    { x: "42%", y: "42%" },  // Tür 16
    { x: "65%", y: "45%" },  // Tür 17
    { x: "15%", y: "70%" },  // Tür 18
    { x: "45%", y: "70%" },  // Tür 19
    { x: "72%", y: "60%" },  // Tür 20
    { x: "37%", y: "85%" },  // Tür 21
    { x: "55%", y: "95%" },  // Tür 22
    { x: "85%", y: "95%" },  // Tür 23
    { x: "23%", y: "25%" },   // Tür 24
    { x: "15%", y: "10%" },  // Tür 1
    { x: "40%", y: "10%" },  // Tür 2
    { x: "70%", y: "10%" },  // Tür 3
    { x: "10%", y: "35%" },  // Tür 4
    { x: "50%", y: "35%" },  // Tür 5
    { x: "80%", y: "35%" },  // Tür 6
    { x: "25%", y: "52%" },  // Tür 7
    { x: "55%", y: "60%" },  // Tür 8
    { x: "85%", y: "60%" },  // Tür 9
    { x: "23%", y: "85%" },  // Tür 10
    { x: "33%", y: "62%" },  // Tür 11
    { x: "75%", y: "85%" },  // Tür 12
    { x: "30%", y: "20%" },  // Tür 13
    { x: "60%", y: "20%" },  // Tür 14
    { x: "90%", y: "20%" },  // Tür 15
    { x: "42%", y: "42%" },  // Tür 16
    { x: "65%", y: "45%" },  // Tür 17
    { x: "15%", y: "70%" },  // Tür 18
    { x: "45%", y: "70%" },  // Tür 19
    { x: "72%", y: "60%" },  // Tür 20
    { x: "37%", y: "85%" },  // Tür 21
    { x: "55%", y: "95%" },  // Tür 22
    { x: "85%", y: "95%" },  // Tür 23
    { x: "23%", y: "25%" },   // Tür 24
    
];
const positionsMedium    = [
  { x: "10%", y: "10%" },  // Tür 1
  { x: "40%", y: "10%" },  // Tür 2
  { x: "70%", y: "10%" },  // Tür 3
  { x: "10%", y: "35%" },  // Tür 4
  { x: "50%", y: "35%" },  // Tür 5
  { x: "80%", y: "35%" },  // Tür 6
  { x: "25%", y: "52%" },  // Tür 7
  { x: "55%", y: "60%" },  // Tür 8
  { x: "85%", y: "60%" },  // Tür 9
  { x: "23%", y: "85%" },  // Tür 10
  { x: "33%", y: "62%" },  // Tür 11
  { x: "75%", y: "85%" },  // Tür 12
  { x: "30%", y: "20%" },  // Tür 13
  { x: "60%", y: "20%" },  // Tür 14
  { x: "90%", y: "20%" },  // Tür 15
  { x: "42%", y: "42%" },  // Tür 16
  { x: "65%", y: "45%" },  // Tür 17
  { x: "15%", y: "70%" },  // Tür 18
  { x: "45%", y: "70%" },  // Tür 19
  { x: "72%", y: "60%" },  // Tür 20
  { x: "37%", y: "85%" },  // Tür 21
  { x: "55%", y: "75%" },  // Tür 22
  { x: "85%", y: "75%" },  // Tür 23
  { x: "23%", y: "25%" },   // Tür 24
  { x: "10%", y: "10%" },  // Tür 1
  { x: "40%", y: "10%" },  // Tür 2
  { x: "70%", y: "10%" },  // Tür 3
  { x: "10%", y: "35%" },  // Tür 4
  { x: "50%", y: "35%" },  // Tür 5
  { x: "80%", y: "35%" },  // Tür 6
  { x: "25%", y: "52%" },  // Tür 7
  { x: "55%", y: "60%" },  // Tür 8
  { x: "85%", y: "60%" },  // Tür 9
  { x: "23%", y: "85%" },  // Tür 10
  { x: "33%", y: "62%" },  // Tür 11
  { x: "75%", y: "85%" },  // Tür 12
  { x: "30%", y: "20%" },  // Tür 13
  { x: "60%", y: "20%" },  // Tür 14
  { x: "90%", y: "20%" },  // Tür 15
  { x: "42%", y: "42%" },  // Tür 16
  { x: "65%", y: "45%" },  // Tür 17
  { x: "15%", y: "70%" },  // Tür 18
  { x: "45%", y: "70%" },  // Tür 19
  { x: "72%", y: "60%" },  // Tür 20
  { x: "37%", y: "85%" },  // Tür 21
  { x: "55%", y: "75%" },  // Tür 22
  { x: "85%", y: "75%" },  // Tür 23
  { x: "23%", y: "25%" }   // Tür 24
  
];
const positionsSmall     = [
  { x: "10%", y: "10%" },  // Tür 1
  { x: "40%", y: "10%" },  // Tür 2
  { x: "70%", y: "10%" },  // Tür 3
  { x: "10%", y: "35%" },  // Tür 4
  { x: "50%", y: "35%" },  // Tür 5
  { x: "70%", y: "35%" },  // Tür 6
  { x: "25%", y: "52%" },  // Tür 7
  { x: "55%", y: "60%" },  // Tür 8
  { x: "75%", y: "48%" },  // Tür 9
  { x: "23%", y: "85%" },  // Tür 10
  { x: "33%", y: "62%" },  // Tür 11
  { x: "75%", y: "85%" },  // Tür 12
  { x: "30%", y: "23%" },  // Tür 13
  { x: "60%", y: "20%" },  // Tür 14
  { x: "75%", y: "20%" },  // Tür 15
  { x: "42%", y: "42%" },  // Tür 16
  { x: "65%", y: "45%" },  // Tür 17
  { x: "15%", y: "70%" },  // Tür 18
  { x: "50%", y: "75%" },  // Tür 19
  { x: "72%", y: "60%" },  // Tür 20
  { x: "43%", y: "90%" },  // Tür 21
  { x: "70%", y: "75%" },  // Tür 22
  { x: "65%", y: "95%" },  // Tür 23
  { x: "23%", y: "25%" },   // Tür 24
  { x: "10%", y: "10%" },  // Tür 1
  { x: "40%", y: "10%" },  // Tür 2
  { x: "70%", y: "10%" },  // Tür 3
  { x: "10%", y: "35%" },  // Tür 4
  { x: "50%", y: "35%" },  // Tür 5
  { x: "70%", y: "35%" },  // Tür 6
  { x: "25%", y: "52%" },  // Tür 7
  { x: "55%", y: "60%" },  // Tür 8
  { x: "85%", y: "60%" },  // Tür 9
  { x: "23%", y: "85%" },  // Tür 10
  { x: "33%", y: "62%" },  // Tür 11
  { x: "75%", y: "85%" },  // Tür 12
  { x: "30%", y: "23%" },  // Tür 13
  { x: "60%", y: "20%" },  // Tür 14
  { x: "75%", y: "20%" },  // Tür 15
  { x: "42%", y: "42%" },  // Tür 16
  { x: "65%", y: "45%" },  // Tür 17
  { x: "15%", y: "70%" },  // Tür 18
  { x: "50%", y: "75%" },  // Tür 19
  { x: "72%", y: "60%" },  // Tür 20
  { x: "43%", y: "90%" },  // Tür 21
  { x: "70%", y: "75%" },  // Tür 22
  { x: "65%", y: "95%" },  // Tür 23
  { x: "23%", y: "25%" }   // Tür 24
  
];

function updateDoorPositions() {
  let positions;
  if (window.innerWidth < 550) {
    positions = positionsSmall;
  } else if (window.innerWidth < 990) {
    positions = positionsMedium;
  } else {
    positions = positionsLarge;
  }

  doors.forEach((door, index) => {
    if (positions[index]) {
      door.style.left = positions[index].x;
      door.style.top = "-200px"; // Startposition oberhalb des Bildschirms
    }
  });
}

updateDoorPositions(); // Setzt die Positionen initial

window.addEventListener("resize", updateDoorPositions); // Aktualisiert beim Resize

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let positions;
      if (window.innerWidth < 550) {
        positions = positionsSmall;
      } else if (window.innerWidth < 990) {
        positions = positionsMedium;
      } else {
        positions = positionsLarge;
      }

      doors.forEach((door, index) => {
        if (positions[index]) {
          door.style.top = positions[index].y; // Fallen auf finale Position
          door.style.opacity = "1";
        }
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

observer.observe(document.querySelector("#kalender"));
});