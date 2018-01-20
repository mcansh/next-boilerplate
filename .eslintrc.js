module.exports = {
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  plugins: ['import', 'prettier'],
  rules: {
    'comma-dangle': [2, 'always-multiline'],
  },
};
