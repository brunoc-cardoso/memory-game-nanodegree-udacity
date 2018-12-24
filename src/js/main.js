'user strict'

const cards = document.querySelectorAll('.memory-card');
let firstCard, secondCard;
let lockCard = false;

function flipCard() {
  if (lockCard) return false;

  this.classList.add("flip");


  if (!firstCard) {
    firstCard = this;
    return false;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMath = firstCard.dataset.card === secondCard.dataset.card;

  if (!isMath) {
    disableCards();
  } else {
    resetCards(isMath);
  }
}

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

(function shuffle() {
  cards.forEach(card => {
    let rand = Math.floor(Math.random() * 12);
    card.style.order = rand;
  });
})();

function resetCards(isMath = false) {
  if (isMath) {
    addBorderCorrect();
    firstCard.removeEventListener('click', flipCard);  
    secondCard.removeEventListener('click', flipCard);  
  } 

  [firstCard, secondCard, lockCard] = [null, null, false];
}

cards.forEach(card => card.addEventListener('click', flipCard));

// 

function reloadPage() {
  window.location.reload();
}