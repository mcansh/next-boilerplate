#!/usr/bin/env node
const fs = require('fs-extra');
const { resolve, join } = require('path');
const args = require('args');
const { spawn } = require('../utils/exec');

args
  .option('new', 'Create a new directory and run the initializer')
  .option('skipInstall', 'Skips installation of dependencies')
  .option('npm', 'Use npm instead of yarn')
  .option('skipEslint', "Don't install ESLint");

const flags = args.parse(process.argv);

const copy = () => {
  fs.copySync(
    resolve(__dirname, '../template/components/Hello.js'),
    './components/Hello.js',
  );
  fs.copySync(
    resolve(__dirname, '../template/pages/index.js'),
    './pages/index.js',
  );
  fs.copySync(
    resolve(__dirname, '../template/pages/_document.js'),
    './pages/_document.js',
  );
  fs.copySync(resolve(__dirname, '../template/.eslintrc.js'), './.eslintrc.js');
};

const generatePackageJSON = async () => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const pkg = require(join(process.cwd(), 'package.json'));
  if (!pkg.dependencies) {
    pkg.dependencies = {};
  }
  if (!pkg.dependencies.next) {
    pkg.dependencies.next = 'latest';
  }
  if (!pkg.dependencies.react) {
    pkg.dependencies.react = 'latest';
  }
  if (!pkg.dependencies['react-dom']) {
    pkg.dependencies['react-dom'] = 'latest';
  }
  if (!pkg.dependencies['prop-types']) {
    pkg.dependencies['prop-types'] = 'latest';
  }
  if (!flags.skipEslint) {
    if (!pkg.devDependencies) {
      pkg.devDependencies = {};
    }
    if (!pkg.devDependencies.eslint) {
      pkg.devDependencies.eslint = 'latest';
    }
    if (!pkg.devDependencies['eslint-config-airbnb']) {
      pkg.devDependencies['eslint-config-airbnb'] = 'latest';
    }
    if (!pkg.devDependencies['eslint-config-prettier']) {
      pkg.devDependencies['eslint-config-prettier'] = 'latest';
    }
    if (!pkg.devDependencies['eslint-plugin-import']) {
      pkg.devDependencies['eslint-plugin-import'] = 'latest';
    }
    if (!pkg.devDependencies['eslint-plugin-jsx-a11y']) {
      pkg.devDependencies['eslint-plugin-jsx-a11y'] = 'latest';
    }
    if (!pkg.devDependencies['eslint-plugin-react']) {
      pkg.devDependencies['eslint-plugin-react'] = 'latest';
    }
    if (!pkg.devDependencies['babel-eslint']) {
      pkg.devDependencies['babel-eslint'] = 'latest';
    }
    if (!pkg.devDependencies['eslint-plugin-prettier']) {
      pkg.devDependencies['eslint-plugin-prettier'] = 'latest';
    }
  }
  if (!pkg.scripts) {
    pkg.scripts = {};
  }
  if (!pkg.scripts.dev) {
    pkg.scripts.dev = 'next';
  }
  if (!pkg.scripts.build) {
    pkg.scripts.build = 'next build';
  }
  if (!pkg.scripts.start) {
    pkg.scripts.start = 'next start';
  }
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, '\t'));
  return pkg;
};

const init = async () => {
  const packageManager = flags.npm ? 'npm' : 'yarn';
  if (flags.new) {
    await spawn('mkdir', [flags.new]);
    await process.chdir(flags.new);
  }

  /* eslint-disable no-console */
  await spawn(packageManager, ['init']);
  await generatePackageJSON();
  await copy();
  console.log(`Installing dependencies using ${packageManager}`);
  await spawn(packageManager, ['install']);
  console.log(`
    Things to do next:
      1. cd into your project: 'cd ./${flags.new}'
      2. start your application: '${packageManager} dev'
  `);
  /* eslint-enable no-console */
};

init();
