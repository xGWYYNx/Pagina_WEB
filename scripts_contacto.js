document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));
});



// function mensaje paco
(function() {
  
  const widget = document.getElementById('paco-widget');
  const toggle = document.getElementById('paco-widget-toggle');
  const formContainer = document.getElementById('paco-widget-form-container');
  const form = document.getElementById('paco-widget-form');
  const confirmMsg = document.getElementById('paco-widget-confirm');
  toggle.onclick = function() {
    widget.classList.toggle('open');
    if (widget.classList.contains('open')) {
      setTimeout(() => {
        document.getElementById('paco-widget-textarea').focus();
      }, 200);
    }
  };
  // Close widget when clicking outside
  document.addEventListener('click', function(e) {
    if (!widget.contains(e.target) && widget.classList.contains('open')) {
      widget.classList.remove('open');
    }
  });

  
  form.onsubmit = function(e) {
    e.preventDefault();
    const data = new FormData(form);
    fetch('https://formspree.io/f/mqaqrwqa', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        form.querySelector('textarea').value = '';
        confirmMsg.style.display = 'block';
        setTimeout(() => {
          confirmMsg.style.display = 'none';
          widget.classList.remove('open');
        }, 2000);
      } else {
        confirmMsg.textContent = 'Hubo un error. Intenta de nuevo.';
        confirmMsg.style.color = '#d32f2f';
        confirmMsg.style.display = 'block';
      }
    })
    .catch(() => {
      confirmMsg.textContent = 'Hubo un error. Intenta de nuevo.';
      confirmMsg.style.color = '#d32f2f';
      confirmMsg.style.display = 'block';
    });
  };
})();


