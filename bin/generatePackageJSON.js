import { format } from 'prettier';

const generatePackageJSON = async (pkg, useCanary) => {
  const dependencies = [
    { name: 'babel-plugin-styled-components' },
    { name: 'next', version: useCanary ? 'canary' : 'latest' },
    { name: 'react' },
    { name: 'react-dom' },
    { name: 'prop-types' },
    { name: 'styled-components' },
    { name: 'webpack' },
  ];

  const devDependencies = [
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

  if (!pkg.dependencies) {
    pkg.dependencies = {};
  }

  if (!pkg.devDependencies) {
    pkg.devDependencies = {};
  }

  if (!pkg.scripts) {
    pkg.scripts = {};
  }

  dependencies.forEach(
    dep => (pkg.dependencies[dep.name] = dep.version ? dep.version : 'latest')
  );

  devDependencies.forEach(dep => (pkg.devDependencies[dep] = 'latest'));

  scripts.forEach(script => (pkg.scripts[script.name] = script.script));

  const json = JSON.stringify(pkg, null, 2);
  const prettyJSON = format(json, { parser: 'json' });

  return prettyJSON;
};

export default generatePackageJSON;
