#!/usr/bin/env node
const fs = require('fs-extra');
const { resolve, join } = require('path');
const args = require('args');
const { spawn } = require('../utils/exec');

args
  .option('new', 'Create a new directory and run the initializer')
  .option('skipInstall', 'Skips installation of dependencies')
  .option('npm', 'Use npm instead of yarn')
  .option('canary', 'Use next@canary')
  .option('defaults', 'Use NPM/Yarn init defaults')
  .option('skipEslint', "Don't install ESLint");

const flags = args.parse(process.argv);

const filesToCopy = [
  'components/Hello.js',
  'pages/index.js',
  'pages/_document.js',
  '.gitignore',
];

const copy = () => {
  filesToCopy.forEach(file => {
    fs.copySync(resolve(__dirname, `../template/${file}`), file);
  });
  if (!flags.skipEslint) {
    fs.copySync(
      resolve(__dirname, '../template/.eslintrc.js'),
      './.eslintrc.js'
    );
  }
};

const deps = [
  { name: 'next', version: flags.canary ? 'canary' : 'latest' },
  { name: 'react', version: 'latest' },
  { name: 'react-dom', version: 'latest' },
  { name: 'prop-types', version: 'latest' },
  { name: 'webpack', version: 'latest' },
];
const devDeps = [
  'eslint',
  'babel-eslint',
  'eslint-config-airbnb',
  'eslint-config-prettier',
  'eslint-plugin-import',
  'eslint-plugin-jsx-a11y',
  'eslint-plugin-react',
  'eslint-plugin-prettier',
  'prettier',
];
const scripts = [
  { name: 'dev', script: 'next' },
  { name: 'build', script: 'next build' },
  { name: 'start', script: 'next start' },
];

const generatePackageJSON = async () => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const pkg = require(join(process.cwd(), 'package.json'));
  if (!pkg.dependencies) {
    pkg.dependencies = {};
  }
  deps.forEach(dep => (pkg.dependencies[dep.name] = dep.version));
  if (!flags.skipEslint && !pkg.devDependencies) {
    pkg.devDependencies = {};
  }
  if (!flags.skipEslint) {
    devDeps.forEach(dep => (pkg.devDependencies[dep] = 'latest'));
  }

  if (!pkg.scripts) {
    pkg.scripts = {};
  }
  scripts.forEach(script => (pkg.scripts[script.name] = script.script));

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
  await spawn(packageManager, ['init', flags.defaults ? '-y' : '']);
  await generatePackageJSON();
  await copy();
  console.log(`▲ Installing dependencies using ${packageManager}`);
  await spawn(packageManager, ['install']);
  if (flags.new) {
    console.log(`Application initialized:
    ▲ cd into your project: cd ./${flags.new}
    ▲ start your application: ${packageManager} dev`);
  } else {
    console.log(`Application initialized:
    ▲ Start your application: ${packageManager} dev`);
  }
  /* eslint-enable no-console */
};

init();
