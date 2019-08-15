module.exports = {
  extends: ['mcansh/typescript', 'plugin:import/typescript'],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {},
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
      },
    },
    {
      files: ['*.js', '.*.js'],
      rules: { '@typescript-eslint/no-var-requires': 'off' },
    },
  ],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'promise/prefer-await-to-callbacks': 'off',
    'promise/prefer-await-to-then': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '__tests__/**/*',
          'test-utils/index.tsx',
          'types/jest-dom.d.ts',
        ],
      },
    ],
  },
};
