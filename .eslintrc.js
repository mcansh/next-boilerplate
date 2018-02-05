module.exports = {
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    es6: true
  },
  parser: 'babel-eslint',
  plugins: ['import', 'prettier'],
  rules: {
    'comma-dangle': [2, 'always-multiline'],
        'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true
      }
    ],
  },
};
