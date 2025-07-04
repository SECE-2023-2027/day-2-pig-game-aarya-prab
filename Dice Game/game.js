// Selecting UI elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnNew = document.getElementById('btn-new');
const btnRoll = document.getElementById('btn-roll');
const btnHold = document.getElementById('btn-hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Game variables
let total0, total1, current, active, isPlaying;

function startGame() {
  total0 = 0;
  total1 = 0;
  current = 0;
  active = 0;
  isPlaying = true;

  score0.textContent = '0';
  score1.textContent = '0';
  current0.textContent = '0';
  current1.textContent = '0';

  dice.style.display = 'none';
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
}

function switchTurns() {
  document.getElementById(`current--${active}`).textContent = '0';
  current = 0;

  switch (active) {
    case 0:
      active = 1;
      break;
    case 1:
      active = 0;
      break;
  }

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (!isPlaying) return;

  const roll = Math.floor(Math.random() * 6) + 1;
  dice.src = `dice-${roll}.jpg`;
  dice.style.display = 'block';

  if (roll !== 1) {
    current += roll;
    document.getElementById(`current--${active}`).textContent = current;
  } else {
    switchTurns();
  }
});

btnHold.addEventListener('click', function () {
  if (!isPlaying) return;

  switch (active) {
    case 0:
      total0 += current;
      score0.textContent = total0;
      if (total0 >= 100) {
        isPlaying = false;
        player0.classList.add('player--winner');
        player0.classList.remove('player--active');
        dice.style.display = 'none';
        alert('Player 1 Wins!');
      } else {
        switchTurns();
      }
      break;

    case 1:
      total1 += current;
      score1.textContent = total1;
      if (total1 >= 100) {
        isPlaying = false;
        player1.classList.add('player--winner');
        player1.classList.remove('player--active');
        dice.style.display = 'none';
        alert('Player 2 Wins!');
      } else {
        switchTurns();
      }
      break;
  }
});

btnNew.addEventListener('click', startGame);

// Start the game on load
startGame();
