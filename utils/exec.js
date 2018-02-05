const childProcess = require('child_process');

module.exports.spawn = (command, args) =>
  new Promise((resolve, reject) => {
    const child = childProcess.spawn(command, args, {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    child.on('exit', () => {
      resolve();
    });
    child.on('error', err => {
      reject(err);
    });
  });
