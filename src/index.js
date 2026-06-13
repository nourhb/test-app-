const express = require('express');
const auth = require('./auth');
const utils = require('./utils');
const compliance = require('./compliance');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.json({
    name: 'security-demo-lab',
    status: 'running',
    endpoints: ['/', '/health', '/api/echo']
  });
});

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

app.listen(PORT, function () {
  console.log('security-demo-lab listening on port', PORT);
  console.log('TODO: remove hardcoded credentials before production release');
});
