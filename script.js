'use strict';

//Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//initial cndition settings
let scores, currentScore, activePlayer, play;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  play = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0ElScore.textContent = 0;
  current1ElScore.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

let players = [0, 0];

//function to switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//condition settings when roll dice is clicked(dice functionality)
btnRoll.addEventListener('click', function () {
  if (play) {
    //1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    console.log(dice);

    //2. Displaying dice
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled: if true, switch to next player
    if (dice !== 1) {
      //display currentScore
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // currentScore0El.textContent = currentScore; //for now
    } else {
      //switching active player
      switchPlayer();
    }
  }
});

//BtnHold functionality

btnHold.addEventListener('click', function () {
  if (play) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      //finish
      play = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//Resetting the game
btnNew.addEventListener('click', init);
