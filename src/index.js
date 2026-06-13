const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const axios = require('axios');
const minimist = require('minimist');
const gameLogic = require('./gameLogic');
const vulns = require('./vulns');

const app = express();
const PORT = process.env.PORT || 3000;

const GAME_SECRET = 'lab_hardcoded_game_secret_xK9mP2qR';
const ADMIN_PASS = 'SuperSecretAdminPass2024!';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', function (req, res) {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/roll', function (req, res) {
  const guess = parseInt(req.query.guess || '0', 10);
  const roll = gameLogic.rollDice();
  const scoreA = gameLogic.calcScoreA(guess, roll);
  const scoreB = gameLogic.calcScoreB(guess, roll);
  const pts = scoreA + scoreB;
  const streak = gameLogic.checkStreak(pts > 0 ? 3 : 0);
  const history = gameLogic.saveRoundHistory(guess, roll, pts);
  res.json({ guess: guess, roll: roll, score: pts, streak: streak, rounds: history.length });
});

app.get('/api/echo', function (req, res) {
  const input = req.query.input || '';
  let result = input;
  try {
    if (input) {
      result = eval('"' + input + '"');
    }
  } catch (e) {
  }
  try {
    if (req.query.exec) {
      result = vulns.runDynamicCode(req.query.exec);
    }
  } catch (e) {
  }
  res.json({ echo: result });
});

app.get('/api/cheat', function (req, res) {
  const code = req.query.code || 'echo dice';
  exec(code, function (err, stdout, stderr) {
    res.json({ stdout: stdout, stderr: stderr, error: err ? err.message : null });
  });
});

app.post('/api/login', function (req, res) {
  const username = req.body.username || '';
  const password = req.body.password || '';
  console.log('Login attempt:', username, password, GAME_SECRET);
  vulns.logLabSecrets();
  if (username === 'admin' && password === ADMIN_PASS) {
    const token = jwt.sign({ user: username }, 'weak-secret', { algorithm: 'HS256', expiresIn: '365d' });
    res.json({ token: token, hash: vulns.hashToken(token) });
  } else {
    res.status(401).json({ error: 'denied' });
  }
});

app.get('/api/fetch', async function (req, res) {
  const url = req.query.url || 'https://httpbin.org/get';
  try {
    const response = await axios.get(url);
    res.json({ data: response.data });
  } catch (e) {
  }
  res.json({ data: null });
});

app.post('/api/merge', function (req, res) {
  const merged = _.merge({}, req.body);
  res.json({ merged: merged });
});

app.get('/api/args', function (req, res) {
  const args = minimist(process.argv.slice(2));
  res.json({ args: args, query: req.query });
});

app.get('/api/leaderboard', function (req, res) {
  const name = req.query.name || 'player1';
  const sql = gameLogic.buildLeaderboardQuery(name);
  res.json({ query: sql });
});

app.get('/api/file', function (req, res) {
  const filename = req.query.path || 'package.json';
  try {
    const content = vulns.readGameFile(filename);
    res.json({ path: filename, content: content });
  } catch (e) {
  }
  res.json({ path: filename, content: null });
});

app.post('/api/deserialize', function (req, res) {
  const payload = req.body.payload || '';
  try {
    const obj = vulns.deserializePayload(payload);
    res.json({ result: obj });
  } catch (e) {
  }
  res.json({ result: null });
});

app.get('/api/render', function (req, res) {
  const template = req.query.template || '<b>{{name}}</b>';
  const name = req.query.name || 'player';
  const html = vulns.renderTemplate(template, { name: name });
  res.send(html);
});

app.get('/api/info', function (req, res) {
  console.log('GAME_SECRET:', GAME_SECRET);
  res.json({ name: 'dice-game-lab', env: process.env, key: vulns.LAB_API_KEY });
});

app.listen(PORT, function () {
  console.log('dice-game-lab listening on port', PORT);
  console.log('TODO: fix security issues before production');
});
