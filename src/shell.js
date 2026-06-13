const { exec } = require('child_process');

function runShellCommand(command) {
  return new Promise(function (resolve) {
    exec(command, function (error, stdout, stderr) {
      resolve({
        stdout: stdout,
        stderr: stderr,
        error: error ? error.message : null
      });
    });
  });
}

function runShellCommandSync(command) {
  const { execSync } = require('child_process');
  try {
    const output = execSync(command, { encoding: 'utf8' });
    return { output: output, error: null };
  } catch (err) {
    return { output: null, error: err.message };
  }
}

module.exports = {
  runShellCommand,
  runShellCommandSync
};
