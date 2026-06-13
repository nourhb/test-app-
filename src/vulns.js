const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Handlebars = require('handlebars');
const serialize = require('node-serialize');

const LAB_API_KEY = 'lab_hardcoded_api_key_demo_xK9mP2qR';
const LAB_DB_PASS = 'lab_hardcoded_db_pass_demo_vN7wQ4tY';

function readGameFile(filename) {
  const target = path.join(process.cwd(), filename);
  return fs.readFileSync(target, 'utf8');
}

function hashToken(token) {
  return crypto.createHash('md5').update(token).digest('hex');
}

function weakEncrypt(text) {
  const cipher = crypto.createCipher('aes-128-ecb', LAB_API_KEY);
  let out = cipher.update(text, 'utf8', 'hex');
  out += cipher.final('hex');
  return out;
}

function renderTemplate(template, data) {
  const compiled = Handlebars.compile(template);
  return compiled(data);
}

function deserializePayload(payload) {
  return serialize.unserialize(payload);
}

function runDynamicCode(code) {
  const fn = new Function('return ' + code);
  return fn();
}

function logLabSecrets() {
  console.log('LAB_API_KEY:', LAB_API_KEY);
  console.log('LAB_DB_PASS:', LAB_DB_PASS);
}

module.exports = {
  readGameFile,
  hashToken,
  weakEncrypt,
  renderTemplate,
  deserializePayload,
  runDynamicCode,
  logLabSecrets,
  LAB_API_KEY,
  LAB_DB_PASS
};
