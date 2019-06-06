module.exports = {
  extends: ['mcansh/typescript', 'plugin:import/typescript'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    useJSXTextNode: true,
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {},
      typescript: {},
    },
  },
  overrides: {
    files: ['*.js', '.*.js'],
    rules: { '@typescript-eslint/no-var-requires': 'off' },
  },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'promise/prefer-await-to-callbacks': 'off',
    'promise/prefer-await-to-then': 'off',
  },
};
