module.exports = {
  extends: ['mcansh/typescript', 'plugin:mdx/recommended'],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {},
      typescript: {},
    },
  }
};
