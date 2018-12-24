'use strict'

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