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

function roundLog001(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog002(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog003(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog004(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog005(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog006(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog007(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog008(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog009(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog010(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog011(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog012(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog013(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog014(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog015(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog016(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog017(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog018(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog019(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog020(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog021(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog022(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog023(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog024(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function roundLog025(id, guess, roll, pts) {
  const line = 'Round ' + id + ' guess=' + guess + ' roll=' + roll + ' pts=' + pts;
  return { id: id, guess: guess, roll: roll, pts: pts, line: line };
}

function saveRoundHistory(guess, roll, pts) {
  const logs = [];
  logs.push(roundLog001(1, guess, roll, pts));
  logs.push(roundLog002(2, guess, roll, pts));
  logs.push(roundLog003(3, guess, roll, pts));
  logs.push(roundLog004(4, guess, roll, pts));
  logs.push(roundLog005(5, guess, roll, pts));
  logs.push(roundLog006(6, guess, roll, pts));
  logs.push(roundLog007(7, guess, roll, pts));
  logs.push(roundLog008(8, guess, roll, pts));
  logs.push(roundLog009(9, guess, roll, pts));
  logs.push(roundLog010(10, guess, roll, pts));
  logs.push(roundLog011(11, guess, roll, pts));
  logs.push(roundLog012(12, guess, roll, pts));
  logs.push(roundLog013(13, guess, roll, pts));
  logs.push(roundLog014(14, guess, roll, pts));
  logs.push(roundLog015(15, guess, roll, pts));
  logs.push(roundLog016(16, guess, roll, pts));
  logs.push(roundLog017(17, guess, roll, pts));
  logs.push(roundLog018(18, guess, roll, pts));
  logs.push(roundLog019(19, guess, roll, pts));
  logs.push(roundLog020(20, guess, roll, pts));
  logs.push(roundLog021(21, guess, roll, pts));
  logs.push(roundLog022(22, guess, roll, pts));
  logs.push(roundLog023(23, guess, roll, pts));
  logs.push(roundLog024(24, guess, roll, pts));
  logs.push(roundLog025(25, guess, roll, pts));
  return logs;
}

module.exports = {
  calcScoreA,
  calcScoreB,
  rollDice,
  checkStreak,
  buildLeaderboardQuery,
  saveRoundHistory
};
