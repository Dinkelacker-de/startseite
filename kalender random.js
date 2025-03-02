// Target the section where the doors are located
const section = document.getElementById('kalender');  // Your section with the doors

// Store used positions to avoid overlap
let usedXPositions = [];
let usedYPositions = [];

// Function to generate random Y positions that do not overlap
function getRandomYPosition() {
  let randomY;
  do {
    randomY = Math.floor(Math.random() * 300) + 100; // Random value between 100px and 400px
  } while (usedYPositions.includes(randomY)); // Ensure it's not already used
  usedYPositions.push(randomY);
  return randomY;
}

// Function to generate random X positions that do not overlap
function getRandomXPosition() {
  let randomX;
  do {
    randomX = Math.floor(Math.random() * 90) + 5; // Random percentage between 5% and 95%
  } while (usedXPositions.includes(randomX)); // Ensure it's not already used
  usedXPositions.push(randomX);
  return randomX;
}

// Create 24 doors dynamically
const innerWrapper = document.querySelector('.inner-wrapper-a');

for (let i = 1; i <= 24; i++) {
  const door = document.createElement('div');
  door.classList.add('door', `door-${i}`);
  
  // Add an SVG element (or any content you'd like inside the door)
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttribute("width", "147");
  svgElement.setAttribute("height", "208");
  svgElement.setAttribute("viewBox", "0 0 147 208");
  svgElement.setAttribute("fill", "none");

  // Adding path inside SVG (this could be different based on your design)
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M34.0979 68.3887L73.8713 0L112.902 68.3887H99.2629L131.088 123.853H110.629L147 187.676H93.9588V203.251C93.9588 205.759 89.723 207.271 87.5559 207.468C81.1304 208.053 63.263 208.327 57.2542 207.385C55.5569 207.119 52.2835 204.839 52.2835 203.251V187.676H0L36.3711 123.853H15.9124L47.7371 68.3887H34.0979Z");
  path.setAttribute("fill", "black");
  svgElement.appendChild(path);

  door.appendChild(svgElement);
  
  // Add the door to the inner wrapper
  innerWrapper.appendChild(door);
}

// Create an intersection observer to trigger the animation
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add the 'animate' class to each door when the section enters the viewport
      document.querySelectorAll('.inner-wrapper-a > div').forEach((door, index) => {
        // Apply random X and Y positions for each door (ensure no overlap)
        const randomTop = getRandomYPosition(); // Get random Y position
        const randomLeft = getRandomXPosition(); // Get random X position
        
        // Set the custom properties for position
        door.style.setProperty('--random-top', `${randomTop}px`);
        door.style.setProperty('--random-left', `${randomLeft}%`);

        door.classList.add('animate');
      });
      // Stop observing once the animation has starteda
      observer.disconnect();
    }
  });
}, {
  threshold: 0.5 // Trigger when 50% of the section is in view
});

// Observe the section
observer.observe(section);

