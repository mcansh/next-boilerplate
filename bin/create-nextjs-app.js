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
  .option(['y', 'defaults'], 'Use NPM/Yarn init defaults')
  .option(['d', 'defaults'], 'Use NPM/Yarn init defaults')
  .option('skipEslint', "Don't install ESLint");

const flags = args.parse(process.argv);

const { new: newDir, skipEslint, skipInstall, npm, canary, defaults } = flags;

const filesToCopy = [
  'components/Hello.js',
  'pages/index.js',
  'pages/_document.js',
];

const copy = () => {
  filesToCopy.forEach(file => {
    fs.copySync(resolve(__dirname, `../template/${file}`), file);
  });
  fs.copySync(resolve(__dirname, '../template/gitignore'), './.gitignore');
  if (!skipEslint) {
    fs.copySync(
      resolve(__dirname, '../template/.eslintrc.js'),
      './.eslintrc.js'
    );
  }
};

const deps = [
  { name: 'next', version: canary ? 'canary' : 'latest' },
  { name: 'react', version: 'latest' },
  { name: 'react-dom', version: 'latest' },
  { name: 'prop-types', version: 'latest' },
  { name: 'webpack', version: 'latest' },
];

const devDeps = [
  'eslint',
  'babel-eslint',
  'eslint-config-airbnb',
  'eslint-config-mcansh',
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
  if (!skipEslint && !pkg.devDependencies) {
    pkg.devDependencies = {};
  }
  if (!skipEslint) {
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
  const packageManager = npm ? 'npm' : 'yarn';
  if (newDir) {
    await spawn('mkdir', [newDir]);
    await process.chdir(newDir);
  }

  /* eslint-disable no-console */
  await spawn(packageManager, ['init', defaults ? '-y' : '']);
  await generatePackageJSON();
  await copy();
  if (!skipInstall) {
    console.log(`▲ Installing dependencies using ${packageManager}`);
    await spawn(packageManager, ['install']);
  }
  if (newDir) {
    console.log(`Application initialized:
    ▲ cd into your project: cd ./${newDir}
    ▲ start your application: ${packageManager} dev`);
  } else {
    console.log(`Application initialized:
    ▲ Start your application: ${packageManager} dev`);
  }
  /* eslint-enable no-console */
};

init();
