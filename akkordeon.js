document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.akordeon-tab');


  if (tabs.length > 0) {
      tabs[0].classList.add('active');
  }

  tabs.forEach((tab, index) => {
      tab.querySelector('h5').addEventListener('click', function() {

          tabs.forEach((t, i) => {
              if (i !== index) {
                  t.classList.remove('active');
              }
          });

          tab.classList.toggle('active');
      });
  });
});
