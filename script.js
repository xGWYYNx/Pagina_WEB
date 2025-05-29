// const player = document.getElementById('player');
// const audio = new Audio ();
// audio.src ='media BPA/Podcast 2.mp3';
                
// player.addEventListener('click', function() {
//     if (audio.paused) {
//         audio.play();
//         player.innerText = 'Pause';
//     }else {
//         audio.pause();
//         player.innerText = 'Play';
//     }
// })

// custom-audio button

const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const resetButton = document.getElementById('reset');

// Format time in mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update progress bar and time
function updateProgress() {
    progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
}

// Set audio duration
audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
});

// Play/Pause functionality
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = '⏸'; // Pause icon
    } else {
        audio.pause();
        playPauseButton.textContent = '▶'; // Play icon
    }
});

// Update progress bar as audio plays
audio.addEventListener('timeupdate', updateProgress);

// Seek functionality
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Reset functionality
resetButton.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseButton.textContent = '▶'; // Reset to play icon
    updateProgress();
});


// Image slider functionality

const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Handle scrollbar thumb drag  
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

     
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);


const filterButtons = document.querySelectorAll('.container_categorias button');
const cards = document.querySelectorAll('.container_card .card');


filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter'); // Get the filter category

        cards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.style.display = 'block'; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    });
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        filterButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');
    });
});


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

