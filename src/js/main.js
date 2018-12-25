'user strict'

const cards = document.querySelectorAll('.memory-card');
let firstCard, secondCard;
let star = document.body.querySelector('#star1');
let star2 = document.body.querySelector('#star2');
let star3 = document.body.querySelector('#star3');
let lockCard = false;

let movementsDiv = document.body.querySelector('#movements');
let movementsCounter = 0;
let counterTag = '';

// Counts and updates the number of movements
function showAmountMovements() {
  movementsCounter++;
  counterTag = `
    <span>Movements: ${movementsCounter}</span>
  `;
  movementsDiv.innerHTML = counterTag;
  alterStarStatus();
}

// Changes the status of movement stars
function alterStarStatus() {
  if (movementsCounter > 20 && movementsCounter <= 28) {
    star3.classList.remove("fa");
    star3.classList.add("far");
  } else if (movementsCounter > 28) {
    star2.classList.remove("fa");
    star2.classList.add("far");
  }
}

// Turn the cards
function flipCard() {
  if (lockCard) return false;

  this.classList.add("flip");
  showAmountMovements();
  
  if (!firstCard) {
    firstCard = this;
    return false;
  }

  secondCard = this;
  checkForMatch();
}

// Checks if the selected cards are equal
function checkForMatch() {
  let isMath = firstCard.dataset.card === secondCard.dataset.card;

  if (!isMath) {
    disableCards();
  } else {
    resetCards(isMath);
  }
}

// Alter style
// Adds or removes the letter border according to the status
function addBorderCorrect() {
  lockCard = true;
  firstCard.classList.add("borderCorrect");
  secondCard.classList.add("borderCorrect");
}

function addBorderError() {
  lockCard = true;
  firstCard.classList.add("borderError");
  secondCard.classList.add("borderError");
}

function removeBorderError() {
  lockCard = true;
  firstCard.classList.remove("borderError");
  secondCard.classList.remove("borderError");
}

// Disables the cards that are already turned
function disableCards() {
  lockCard = true;

  addBorderError();

  setTimeout(() => {

    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    removeBorderError();

    resetCards();
  }, 1000);
}

// Shuffles the cards as soon as the page loads
(function shuffle() {
  cards.forEach(card => {
    let rand = Math.floor(Math.random() * 12);
    card.style.order = rand;
  });
})();

// Reset the cards
function resetCards(isMath = false) {
  if (isMath) {
    addBorderCorrect();
    firstCard.removeEventListener('click', flipCard);  
    secondCard.removeEventListener('click', flipCard);  
  } 
  [firstCard, secondCard, lockCard] = [null, null, false];
}

// Adds movement on all cards
cards.forEach(card => card.addEventListener('click', flipCard));

// Reload the page to restart the game
function reloadPage() {
  window.location.reload();
}

