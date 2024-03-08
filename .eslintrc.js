module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  root: true,
  plugins: ['prettier'],
  env: {
    // https://eslint.org/docs/user-guide/configuring#specifying-environments
    amd: true, // adds require() and define() as global vars per amd spec
    browser: true, // adds browser globals (eg, window and document)
    es2022: true,
    jest: true, // adds Jest global vars
    node: true, // adds Node.js global vars and scoping
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'prettier/prettier': [
      2,
      {
        arrowParens: 'always',
        editorconfig: true, // see .editorconfig
        endOfLine: 'auto', // see .editorconfig
        jsxBracketSameLine: true,
        jsxSingleQuote: true,
        printWidth: 100, // NB - this isn't like max-len, it's a soft target
        quoteProps: 'as-needed',
        semi: true,
        singleQuote: true,
        // tabWidth: 2,  // see .editorconfig
        // trailingComma: 'es5', // es5 is default in prettier
        usePrettierrc: false, // no .prettierrc needed
        // useTabs: false, // see .editorconfig
      },
    ],
  },
};
