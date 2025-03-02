document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.akordeon-tab');
  
    tabs.forEach(tab => {
      tab.querySelector('h5').addEventListener('click', function() {
        tab.classList.toggle('active');
      });
    });
  });
  