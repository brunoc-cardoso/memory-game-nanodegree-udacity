const cardBoard = document.querySelector('#cardboard');
const images = [
  'image1.svg',
  'image2.svg',
  'image3.svg',
  'image4.svg',
  'image5.svg',
  'image6.svg',
  'image7.svg',
  'image8.svg',
];

let cardHTML = '';

images.forEach(img => {
  cardHTML += `
    <div class="memory-card" data-card="${img}">
      <img class="front-face" src="../../resource/images/${img}">
      <img class="back-face" src="../../resource/images/puzzle.svg">
    </div>
  `
});

cardBoard.innerHTML = cardHTML + cardHTML;

// fim renderização

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

  !isMath ? disableCards() : resetCards(isMath);
}

function disableCards() {
  lockCard = true;

  setTimeout(() => {

    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetCards();
  }, 1500);
}

(function shuffle() {
  cards.forEach(card => {
    let rand = Math.floor(Math.random() * 12);
    card.style.order = rand;
  });
})();

function resetCards(isMath = false) {
  if (isMath) {
    firstCard.removeEventListener('click', flipCard);  
    secondCard.removeEventListener('click', flipCard);  
  } 

  [firstCard, secondCard, lockCard] = [null, null, false];
}

cards.forEach(card => card.addEventListener('click', flipCard));