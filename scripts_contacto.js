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