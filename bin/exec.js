import childProcess from 'child_process';

const spawn = (command, args) =>
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

export default spawn;
