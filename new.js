#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const spawn = require('./utils/exec').spawn;

function scaffold() {
  return Promise.resolve()
    .then(() => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const packageJSON = require(path.join(process.cwd(), 'package.json'));
      if (!packageJSON.dependencies) {
        packageJSON.dependencies = {};
      }
      if (!packageJSON.dependencies.next) {
        packageJSON.dependencies.next = 'latest';
      }
      if (!packageJSON.dependencies.react) {
        packageJSON.dependencies.react = 'latest';
      }
      if (!packageJSON.dependencies['react-dom']) {
        packageJSON.dependencies['react-dom'] = 'latest';
      }
      if (!packageJSON.devDependencies) {
        packageJSON.devDependencies = {};
      }
      if (!packageJSON.devDependencies.eslint) {
        packageJSON.devDependencies.eslint = 'latest';
      }
      if (!packageJSON.devDependencies['eslint-config-airbnb']) {
        packageJSON.devDependencies['eslint-config-airbnb'] = 'latest';
      }
      if (!packageJSON.devDependencies['eslint-plugin-import']) {
        packageJSON.devDependencies['eslint-plugin-import'] = 'latest';
      }
      if (!packageJSON.devDependencies['eslint-plugin-jsx-a11y']) {
        packageJSON.devDependencies['eslint-plugin-jsx-a11y'] = 'latest';
      }
      if (!packageJSON.devDependencies['eslint-plugin-react']) {
        packageJSON.devDependencies['eslint-plugin-react'] = 'latest';
      }
      if (!packageJSON.scripts) {
        packageJSON.scripts = {};
      }
      if (!packageJSON.scripts.dev) {
        packageJSON.scripts.dev = 'next';
      }
      if (!packageJSON.scripts.build) {
        packageJSON.scripts.build = 'next build';
      }
      if (!packageJSON.scripts.start) {
        packageJSON.scripts.publish = 'next start';
      }
      fs.writeFileSync('package.json', JSON.stringify(packageJSON, null, '\t'));
      return packageJSON;
    })
    .then((packageJSON) => {
      console.log(`${chalk.dim('[2/4]')} 🌳  Creating basic architecture...`);
      fs.mkdirSync(path.join(process.cwd(), 'components'));
      return packageJSON;
    })
    .then(() => {
      console.log(`${chalk.dim('[3/4]')} 📜  Creating default .gitignore...`);
      const gitignore = './.gitignore';
      if (!fs.existsSync(gitignore)) {
        const DEFAULT_GITIGNORE = `
node_modules
*.log
.DS_Store
        `.trim();
        fs.writeFileSync(gitignore, DEFAULT_GITIGNORE);
      }
    });
}

Promise.resolve()
  .then(() => {
    console.log(`${chalk.dim('[1/4]')} 📦  Creating package.json...`);
    return spawn('yarn', ['init']);
  })
  .then(scaffold)
  .then(() => {
    console.log(`${chalk.dim('[4/4]')} 📦  Installing packages...`);
    return spawn('yarn', ['install']);
  })
  .then(() => {
    console.log(`${chalk.green('Success 🎉 ')} App initialized`);
    process.exit(0);
  })
  .catch((err) => {
    console.log(`${chalk.red('Error ⛔ ')} Error while initializing App`);
    console.log((err || {}).body || err);
    process.exit(1);
  });
