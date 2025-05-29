
// Interaction buton categorys
// Select all buttons and cards
const filterButtons = document.querySelectorAll('.container_categorias button');
const cards = document.querySelectorAll('.container_card .card');

// Pagination variables
const cardsPerPage = 4; // Number of cards per page
let currentPage = 1;
let filteredCards = Array.from(cards); 

// Function to display cards for the current page
function displayCards() {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    // Hide all cards
    cards.forEach(card => {
        card.style.display = 'none'; 
    });

    // Show only the cards for the current page
    filteredCards.slice(startIndex, endIndex).forEach(card => {
        card.style.display = 'block'; 
    });

    
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}


function filterCards(filter) {
    
    filteredCards = Array.from(cards).filter(card => {
        const category = card.getAttribute('data-category');
        return filter === 'all' || category === filter;
    });

    
    currentPage = 1;
    displayCards();
}


filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterCards(filter);
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Select pagination buttons
const prevButton = document.querySelector('.pagination .prev');
const nextButton = document.querySelector('.pagination .next');

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayCards();
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage * cardsPerPage < filteredCards.length) {
        currentPage++;
        displayCards();
    }
});

displayCards();

document.addEventListener('DOMContentLoaded', function() {
  let pendingDownloadUrl = null;

  
  document.querySelectorAll('.boton_descarga').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (btn.hasAttribute('href') && btn.getAttribute('href') !== '#') {
        pendingDownloadUrl = btn.getAttribute('href');
      } else {
        pendingDownloadUrl = null;
      }
      document.getElementById('donation-modal').classList.add('active');
    });
  });

  
  const downloadBtn = document.querySelector('.donation-modal-download-button');
  if (downloadBtn) {
    downloadBtn.onclick = function() {
     if (pendingDownloadUrl) {
        window.open(pendingDownloadUrl, '_blank');
        pendingDownloadUrl = null;
      }
      document.getElementById('donation-modal').classList.remove('active');
    };
  }

  const closeBtn = document.querySelector('.donation-modal-close');
  if (closeBtn) {
    closeBtn.onclick = function() {
      document.getElementById('donation-modal').classList.remove('active');
      pendingDownloadUrl = null;
    };
  }

  const modal = document.getElementById('donation-modal');
  if (modal) {
    modal.onclick = function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        pendingDownloadUrl = null;
      }
    };
  }
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


