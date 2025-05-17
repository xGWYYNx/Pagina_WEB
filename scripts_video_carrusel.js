
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