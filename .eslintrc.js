module.exports = {
  parserOptions: {
    ecmaVersion: 2020, // Allows for parsing modern ECMAScript
    sourceType: 'module', // Allows for using imports
    ecmaFeatures: {
      jsx: true, // Allows JSX parsing
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // Always keep this last
  ],
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/display-name': 'off',
    'prettier/prettier': 'off',
  },
};
