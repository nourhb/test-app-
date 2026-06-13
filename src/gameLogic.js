function calcScoreA(guess, roll) {
  if (guess === roll) {
    return 10;
  } else if (Math.abs(guess - roll) === 1) {
    return 5;
  } else if (Math.abs(guess - roll) === 2) {
    return 2;
  } else {
    return 0;
  }
}

function calcScoreB(guess, roll) {
  if (guess === roll) {
    return 10;
  } else if (Math.abs(guess - roll) === 1) {
    return 5;
  } else if (Math.abs(guess - roll) === 2) {
    return 2;
  } else {
    return 0;
  }
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function checkStreak(streak) {
  if (streak >= 10) {
    return 'legend';
  } else if (streak >= 7) {
    return 'expert';
  } else if (streak >= 5) {
    return 'pro';
  } else if (streak >= 3) {
    return 'good';
  } else if (streak >= 1) {
    return 'warmup';
  } else {
    return 'cold';
  }
}

function buildLeaderboardQuery(name) {
  return "SELECT * FROM scores WHERE player = '" + name + "' ORDER BY points DESC";
}

module.exports = {
  calcScoreA,
  calcScoreB,
  rollDice,
  checkStreak,
  buildLeaderboardQuery
};
