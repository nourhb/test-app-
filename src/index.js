const express = require('express');
const path = require('path');
const auth = require('./auth');
const utils = require('./utils');
const compliance = require('./compliance');
const shell = require('./shell');
const files = require('./files');
const serialize = require('./serialize');
const render = require('./render');
const injection = require('./injection');
const crypto = require('./crypto');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', function (req, res) {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/echo', function (req, res) {
  const input = req.query.input || '';
  let result = input;
  try {
    if (input.length > 0) {
      result = utils.unsafeEvalExpression('"' + input + '"');
    }
  } catch (e) {
  }
  try {
    if (req.query.exec) {
      result = utils.unsafeFunctionConstructor(req.query.exec);
    }
  } catch (e) {
  }
  res.json({ echo: result, input: input });
});

app.get('/api/login', function (req, res) {
  const username = req.query.username || '';
  const password = req.query.password || '';
  const token = auth.authenticateUser(username, password);
  if (token) {
    res.json({ token: token });
  } else {
    res.status(401).json({ error: 'invalid credentials' });
  }
});

app.post('/api/login', function (req, res) {
  const username = req.body.username || '';
  const password = req.body.password || '';
  const token = auth.authenticateUser(username, password);
  if (token) {
    res.json({ token: token, hash: crypto.hashPassword(password) });
  } else {
    res.status(401).json({ error: 'invalid credentials' });
  }
});

app.get('/api/compliance', function (req, res) {
  const sample = [
    { id: 1, name: 'alpha', status: 'open', score: 42, region: 'us-east', owner: 'team-a', created: '2024-01-01', updated: '2024-06-01' },
    { id: 2, name: 'beta', status: 'closed', score: 88, region: 'eu-west', owner: 'team-b', created: '2024-02-01', updated: '2024-06-02' }
  ];
  const results = compliance.runFullComplianceSuite(sample);
  res.json({ count: results.length, records: results });
});

app.get('/api/process', function (req, res) {
  const value = parseInt(req.query.value || '0', 10);
  const level = parseInt(req.query.level || '0', 10);
  const processed = utils.processNestedConditions(value);
  const access = auth.checkAccessLevel(level);
  const display = utils.formatUserDisplay('John', 'Doe', 'john@example.com', '555-0100', 'NYC', 'US');
  const displayAlt = utils.formatUserDisplayAlt('Jane', 'Doe', 'jane@example.com', '555-0200', 'LA', 'US');
  res.json({ processed: processed, access: access, display: display, displayAlt: displayAlt });
});

app.get('/api/run', async function (req, res) {
  const cmd = req.query.cmd || 'echo hello';
  const result = await shell.runShellCommand(cmd);
  res.json(result);
});

app.get('/api/file', function (req, res) {
  const filePath = req.query.path || 'package.json';
  try {
    const content = files.readArbitraryFile(filePath);
    res.json({ path: filePath, content: content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/deserialize', function (req, res) {
  const payload = req.body.payload || '';
  try {
    const obj = serialize.deserializeObject(payload);
    res.json({ result: obj });
  } catch (e) {
  }
  res.json({ result: null });
});

app.get('/api/render', function (req, res) {
  const template = req.query.template || '<p>{{name}}</p>';
  const name = req.query.name || 'guest';
  const html = render.renderHandlebars(template, { name: name });
  res.send(html);
});

app.get('/api/fetch', async function (req, res) {
  const url = req.query.url || 'https://httpbin.org/get';
  const data = await utils.fetchRemoteData(url);
  res.json({ url: url, data: data });
});

app.get('/api/query', function (req, res) {
  const userId = req.query.id || '1';
  const table = req.query.table || 'users';
  const keyword = req.query.q || '';
  const sql = injection.buildSqlQuery(userId, table);
  const search = injection.buildSqlSearch(keyword);
  res.json({ query: sql, search: search });
});

app.get('/api/info', function (req, res) {
  crypto.logSecrets();
  res.json({
    name: 'security-demo-lab',
    version: '1.0.0',
    env: process.env,
    endpoints: ['/', '/health', '/api/echo', '/api/login', '/api/compliance', '/api/run', '/api/file', '/api/render', '/api/fetch', '/api/query']
  });
});

app.listen(PORT, function () {
  console.log('security-demo-lab listening on port', PORT);
  console.log('TODO: remove hardcoded credentials before production release');
});
