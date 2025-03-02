document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.akordeon-tab');

  // Open the first tab by default
  if (tabs.length > 0) {
      tabs[0].classList.add('active');
  }

  tabs.forEach((tab, index) => {
      tab.querySelector('h5').addEventListener('click', function() {
          // Close all tabs except the clicked one
          tabs.forEach((t, i) => {
              if (i !== index) {
                  t.classList.remove('active');
              }
          });

          // Toggle the clicked tab
          tab.classList.toggle('active');
      });
  });
});
