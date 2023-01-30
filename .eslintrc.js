module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {
    'import/prefer-default-export': 'off',
    'no-alert': 'off',
    'no-new': 0,
    'max-len': [
      'error',
      {
        ignoreComments: true,
      },
    ],
  },
};
