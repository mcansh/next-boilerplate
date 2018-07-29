module.exports = {
  extends: ['mcansh/base'],
  rules: {
    'no-return-assign': ['error', 'except-parens'],
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'no-console': 'off'
  }
};
