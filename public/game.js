let totalScore = 0;
let roundCount = 0;

const diceEl = document.getElementById('dice');
const scoreEl = document.getElementById('score');
const roundsEl = document.getElementById('rounds');
const streakEl = document.getElementById('streak');
const messageEl = document.getElementById('message');
const rollBtn = document.getElementById('rollBtn');
const guessEl = document.getElementById('guess');

rollBtn.addEventListener('click', async function () {
  const guess = guessEl.value;
  diceEl.classList.add('rolling');
  diceEl.textContent = '...';
  messageEl.textContent = 'Rolling...';
  messageEl.className = 'message';

  try {
    const res = await fetch('/api/roll?guess=' + guess);
    const data = await res.json();

    setTimeout(function () {
      diceEl.classList.remove('rolling');
      diceEl.textContent = data.roll;
      totalScore += data.score;
      roundCount += 1;
      scoreEl.textContent = totalScore;
      roundsEl.textContent = roundCount;
      streakEl.textContent = data.streak;

      if (data.guess === data.roll) {
        messageEl.textContent = 'Jackpot! Exact match +' + data.score;
        messageEl.className = 'message win';
      } else if (data.score > 0) {
        messageEl.textContent = 'Close! Rolled ' + data.roll + ', +' + data.score;
        messageEl.className = 'message win';
      } else {
        messageEl.textContent = 'Miss! Rolled ' + data.roll;
        messageEl.className = 'message lose';
      }
    }, 400);
  } catch (err) {
    diceEl.classList.remove('rolling');
    messageEl.textContent = 'Error: could not reach server';
    messageEl.className = 'message lose';
  }
});
