
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

// Initial display
displayCards();