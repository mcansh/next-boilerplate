#!/usr/bin/env node
const fs = require('fs');
const { red, green, dim } = require('chalk');
const path = require('path');
const spawn = require('../utils/exec').spawn;

const addDependencies = (packageJSON) => {
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
  if (!packageJSON.dependencies['prop-types']) {
    packageJSON.dependencies['prop-types'] = 'latest';
  }
};

const addDevDependencies = (packageJSON) => {
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
};

const addScripts = (packageJSON) => {
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
    packageJSON.scripts.start = 'next start';
  }
};
function scaffold() {
  return Promise.resolve()
    .then(() => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const packageJSON = require(path.join(process.cwd(), 'package.json'));
      addDependencies(packageJSON);
      addDevDependencies(packageJSON);
      addScripts(packageJSON);
      fs.writeFileSync('package.json', JSON.stringify(packageJSON, null, '\t'));
      return packageJSON;
    })
    .then((packageJSON) => {
      console.log(`${dim('[2/4]')} 🌳  Creating basic architecture...`);
      fs.mkdirSync(path.join(process.cwd(), 'components'));
      fs.mkdirSync(path.join(process.cwd(), 'pages'));
      fs.mkdirSync(path.join(process.cwd(), 'layouts'));
      const metaComponent = `
import React from 'react';
import Head from 'next/head';

const Meta = () => (
    <Head>
      <title>${packageJSON.name}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
);

export default Meta;
      `.trim();

      const documentLayout = `
import React from 'react';
import PropTypes from 'prop-types';
import Meta from '../components/Meta';

const Document = ({ children }) => (
  <div>
    <Meta />
    <div>
      {children}
    </div>
  </div>
);

Document.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Document;
      `.trim();

      const indexPgae = `
import React from 'react';
import Document from '../layouts/Document';

const Index = () => (
  <Document>
    <h1>${packageJSON.name}</h1>
  </Document>
);

export default Index;
      `.trim();
      fs.writeFileSync(path.join(process.cwd(), 'layouts', 'Document.js'), documentLayout);
      fs.writeFileSync(path.join(process.cwd(), 'pages', 'index.js'), indexPgae);
      fs.writeFileSync(path.join(process.cwd(), 'components', 'Meta.js'), metaComponent);
      return packageJSON;
    })
    .then(() => {
      console.log(`${dim('[3/4]')} 📜  Creating default .gitignore...`);
      const gitignore = './.gitignore';
      if (!fs.existsSync(gitignore)) {
        const DEFAULT_GITIGNORE = `
node_modules
*.log
.DS_Store
.next
        `.trim();
        fs.writeFileSync(gitignore, DEFAULT_GITIGNORE);
      }
    });
}

Promise.resolve()
  .then(() => {
    console.log(`${dim('[1/4]')} 📦  Creating package.json...`);
    return spawn('yarn', ['init']);
  })
  .then(scaffold)
  .then(() => {
    console.log(`${dim('[4/4]')} 📦  Installing packages...`);
    return spawn('yarn', ['install']);
  })
  .then(() => {
    console.log(`${green('success 🎉 ')} App initialized`);
    process.exit(0);
  })
  .catch((err) => {
    console.log(`${red('error ⛔ ')} Error while initializing App`);
    console.log((err || {}).body || err);
    process.exit(1);
  });
