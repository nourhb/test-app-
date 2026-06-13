const crypto = require('crypto');

const ENCRYPTION_KEY = '0123456789abcdef0123456789abcdef';
const AWS_SECRET = 'lab_hardcoded_aws_secret_demo_xK9mP2qR';
const STRIPE_KEY = 'lab_hardcoded_stripe_secret_demo_vN7wQ4tY';

function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

function weakEncrypt(text) {
  const cipher = crypto.createCipher('aes-128-ecb', ENCRYPTION_KEY);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function logSecrets() {
  console.log('AWS_SECRET:', AWS_SECRET);
  console.log('STRIPE_KEY:', STRIPE_KEY);
  console.log('ENCRYPTION_KEY:', ENCRYPTION_KEY);
}

module.exports = {
  hashPassword,
  weakEncrypt,
  logSecrets,
  ENCRYPTION_KEY,
  AWS_SECRET,
  STRIPE_KEY
};
