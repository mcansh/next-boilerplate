#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const packageJSON = require('./package.json');

function scaffold() {
  return Promise.resolve().then(() => {
    if (!packageJSON.devDependencies) {
      packageJSON.devDependencies = {};
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
    .then(() => {
      console.log(`${chalk.dim('[2/3]')} 🌳  Creating basic architecture...`);
      return packageJSON;
    })
    .then(() => {
      console.log(`${chalk.dim('[3/3]')} 📜  Creating default .gitignore...`);
      const gitignore = path.join(process.cwd(), '.gitignore');
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
    console.log(`${chalk.dim('[1/3]')} 📦  Creating package.json...`);
  })
  .then(program.template = scaffold)
  .then(() => {
    console.log(`${chalk.green('Success 🎉 ')} App initialized`);
    process.exit(0);
  })
  .catch((err) => {
    console.log(`${chalk.red('Error ⛔ ')} Error while initializing App`);
    console.log((err || {}).body || err);
    process.exit(1);
  });
