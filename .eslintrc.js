module.exports = {
  extends: ['@mcansh/eslint-config/typescript'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '__tests__/**/*',
          'test-utils/index.tsx',
          '@types/jest-dom.d.ts',
          'next.config.js',
          'prettier.config.js',
          'stylelint.config.js',
        ],
      },
    ],
  },
};
