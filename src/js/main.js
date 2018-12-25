'user strict'

const cards = document.querySelectorAll('.memory-card');
const star = document.body.querySelector('.star1');
const star2 = document.body.querySelector('.star2');
const star3 = document.body.querySelector('.star3');
const modalDiv = document.body.querySelector('#modalFinalization');
const movementsDiv = document.body.querySelector('#movements');

let firstCard, secondCard;
let lockCard = false;

let timeSpentCounter = 0;
let movementsCounter = 0;
let cardCounting = 0;
let counterTag = '';
let modalTag = '';
let starCount = 3;

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
  if (movementsCounter > 20 && movementsCounter <= 30) {
    star3.classList.remove("fa");
    star3.classList.add("far");
    starCount = 2;
  } else if (movementsCounter > 31) {
    star2.classList.remove("fa");
    star2.classList.add("far");
    starCount = 1;
  }
}

// Change the stars of the modal
function alterStarStatusModal(starCount) {
  let code;

  if (starCount === 1) {
    return code = `
    <i class="fa fa-star star1" aria-hidden="true"></i>
    <i class="far fa-star star2" aria-hidden="true"></i>
    <i class="far fa-star star3" aria-hidden="true"></i>
    `;
  } else if (starCount === 2) {
    return code = `
    <i class="fa fa-star star1" aria-hidden="true"></i>
    <i class="fa fa-star star2" aria-hidden="true"></i>
    <i class="far fa-star star3" aria-hidden="true"></i>
    `;
  } else {
    return code = `
      <i class="fa fa-star star1" aria-hidden="true"></i>
      <i class="fa fa-star star2" aria-hidden="true"></i>
      <i class="fa fa-star star3" aria-hidden="true"></i>
      `;
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

// 

// Reset the cards
function resetCards(isMath = false) {
  if (isMath) {
    addBorderCorrect();
    cardCounting++;

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    if (cardCounting === 2) openModalEndGame();

  }
  [firstCard, secondCard, lockCard] = [null, null, false];
}

// Adds movement on all cards
cards.forEach(card => card.addEventListener('click', flipCard));

// Reload the page to restart the game
function reloadPage() {
  window.location.reload();
}

// Open Modal
function openModalEndGame() {
  $(document).ready(function () {
    timeSpentCounter = showTime();
  });

  let codeIconStar = alterStarStatusModal(starCount);

  setTimeout(function () {
    modalTag = `<!-- Modal end game -->
        <div class="modal fade" id="modalEndGame">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
        
              <!-- Modal Header -->
              <div class="modal-header">
                <h4 class="modal-title">Congratulations!!!</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
        
              <!-- Modal body -->
              <div class="modal-body">
                <div class="row">
                  <p class="ml-3">Congratulations, you have completed the memory game.</p>
                </div>
                <div class="row">
                  <p class="col-3">
                    ${codeIconStar}
                  </p>
                  <p id="timeSpent" class="col-5">Time spent: ${timeSpentCounter}</p>
                  <p id="spendingMovements" class="col-4">spending movements: ${movementsCounter}</p>
                </div>
              </div>
        
              <!-- Modal footer -->
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="reloadPage()">New Game</button>
              </div>
        
            </div>
          </div>
          </div>`;
  
    movementsDiv.innerHTML = modalTag;
    
    // opens the modal in the document
    alterStarStatus();
    $(document).ready(function () {
      alterStarStatus();
      $("#modalEndGame").modal();
    });
  }, 500);
}