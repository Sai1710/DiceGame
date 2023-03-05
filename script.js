'use strict';
const newEl = document.querySelector('.btn--new');
const score0El = document.querySelector('#score--0');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');
let playing = true;
let score = [0, 0];
score0El.textContent = 0;
score1El.textContent = 0;
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
let currentScore = 0;
let activePlayer = 0;
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
const holdEl = document.querySelector('.btn--hold');
const rollEl = document.querySelector('.btn--roll');
rollEl.addEventListener('click', function () {
  if (playing) {
    const diceNum = Math.floor(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNum}.png`;

    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdEl.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    currentScore = 0;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

newEl.addEventListener('click', function () {
  activePlayer = 0;
  score = [0, 0];
  playing = true;
  current0.textContent = 0;
  current1.textContent = 0;
  player0.classList.add('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
});
