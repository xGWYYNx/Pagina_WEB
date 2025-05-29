
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const videos = document.querySelectorAll('.carousel-item video');
const leftBtn = document.querySelector('.carousel-arrow.left');
const rightBtn = document.querySelector('.carousel-arrow.right');
let current = 0;
let interval = null;
let paused = false;

function showSlide(idx) {
  track.style.transform = `translateX(-${idx * 100}%)`;
  current = idx;
}

function nextSlide() {
  showSlide((current + 1) % items.length);
}
function prevSlide() {
  showSlide((current - 1 + items.length) % items.length);
}

function startAuto() {
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    if (!paused) nextSlide();
  }, 60000); // 1 minute
}
function pauseAuto() { paused = true; }
function resumeAuto() { paused = false; }

rightBtn.onclick = nextSlide;
leftBtn.onclick = prevSlide;

items.forEach((item, idx) => {
  item.addEventListener('mouseenter', pauseAuto);
  item.addEventListener('mouseleave', resumeAuto);
  item.addEventListener('touchstart', pauseAuto, {passive:true});
  item.addEventListener('touchend', resumeAuto, {passive:true});
});
videos.forEach((video, idx) => {
  video.addEventListener('click', () => openModal(video.src, video.poster));
});

function openModal(src, poster) {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  modalVideo.src = src;
  modalVideo.poster = poster || '';
  modal.classList.add('active');
  modalVideo.play();
}
document.querySelector('.close-modal').onclick = closeModal;
document.getElementById('videoModal').onclick = function(e) {
  if (e.target === this) closeModal();
};
function closeModal() {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  modal.classList.remove('active');
  modalVideo.pause();
  modalVideo.src = '';
}

showSlide(0);
startAuto();

document.querySelectorAll('.play-overlay').forEach((btn, idx) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const video = btn.previousElementSibling;
    openModal(video.getAttribute('src'), video.getAttribute('poster'));
  });
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