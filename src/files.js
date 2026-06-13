const fs = require('fs');
const path = require('path');

function readArbitraryFile(filePath) {
  const resolved = path.join(process.cwd(), filePath);
  return fs.readFileSync(resolved, 'utf8');
}

function writeArbitraryFile(filePath, content) {
  const resolved = path.join(process.cwd(), filePath);
  fs.writeFileSync(resolved, content, 'utf8');
  return { written: resolved };
}

function listDirectory(dirPath) {
  const resolved = path.join(process.cwd(), dirPath || '.');
  return fs.readdirSync(resolved);
}

module.exports = {
  readArbitraryFile,
  writeArbitraryFile,
  listDirectory
};
