/* global alert */
/* eslint semi: ["error", "always"] */

const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');

let displayScore = document.querySelector('#score');
let displayStrike = document.querySelector('#strike');
let countStrike = 0;
let isStrike = false;

let moleDuration = 1000;

let result = 0;
let currentTime = timeLeft.textContent;

function randomSquare () {
  if (!isStrike) {
    countStrike = 0;
    displayStrike.textContent = countStrike;

    square.forEach(className => {
      className.classList.remove('mole');
    });
  }

  isStrike = false;

  let randomPosition = square[Math.floor(Math.random() * 9)];
  randomPosition.classList.add('mole');

  // assign the id of the randomPosition to hitPosition for later use
  hitPosition = randomPosition.id;
}

square.forEach(id => {
  id.addEventListener('mousedown', () => {
    if (id.id === hitPosition) {
      result = result + 1;
      displayScore.textContent = result;
      removeMole(id);

      countStrike += 1;
      displayStrike.textContent = countStrike;
    };
  });
})

// removes Mole
function removeMole (id) {
  hitPosition = 0
  id.classList.remove('mole');
  isStrike = true;
};

// timer to change mole
function moveMole () {
  var timerId = setInterval(randomSquare, moleDuration);
}

// More about this topic:
//  https://stackoverflow.com/questions/1280263/changing-the-interval-of-setinterval-while-its-running
function changeMoleDuration (time) {
  moleDuration += time;
  clearInterval(timerId);
  timerId = setInterval(randomSquare, moleDuration);
}

// counts to 0, shows alert
function countDown () {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(timerId);
    alert('GAME OVER! Your final score is' + result);
  }
}

moveMole();

let timerId = setInterval(countDown, 1000);
