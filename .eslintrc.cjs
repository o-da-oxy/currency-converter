module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'react/destructuring-assignment': 0,
    '@typescript-eslint/default-param-last': 0,
    'no-param-reassign': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'react/no-array-index-key': 0,
    'react/jsx-key': 0,
    '@typescript-eslint/ban-types': 0,
    'no-restricted-syntax': 0,
    '@typescript-eslint/no-shadow': 0,
    'react/jsx-props-no-spreading': 0,
    'import/order': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0
  },
};
