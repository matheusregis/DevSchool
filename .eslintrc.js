module.exports = {
   env: {
      es6: true,
      node: true,
   },
   extends: ['airbnb-base', 'prettier'],
   plugins: ['prettier'],
   globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
   },
   parser: 'babel-eslint',
   parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
   },
   rules: {
      'prettier/prettier': 'error',
      'class-methods-use-this': 'off',
      'no-param-reassign': 'off',
      'no-underscore-dangle': 'off',
      camelcase: 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
      'no-plusplus': 'off',
      'no-nested-ternary': 'off',
      'no-await-in-loop': 'off',
      'consistent-return': 'off',
      'no-restricted-syntax': 'off',
      'no-prototype-builtins': 'off',
      'prefer-destructuring': 'off',
      'no-shadow': 'off',
      // "indent": [3, "tab"],
   },
   settings: {
      'import/resolver': {
         alias: [
            ['~', './src'],
            ['@api', './src/api'],
            ['@config', './src/config'],
            ['@modules', './src/modules'],
            ['@shared', './src/shared'],
            ['@utils', './src/shared/utils'],
            ['@providers', './src/shared/providers'],
         ],
      },
   },
};
