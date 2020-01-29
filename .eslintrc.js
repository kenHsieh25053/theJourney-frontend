module.exports = {
  extends: [
    'plugin:vue/recommended',
    'plugin:vue/recommended',
    '@vue/standard',
    'eslint-config-prettier'
  ],
  plugins: ['eslint-plugin-prettier'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'prettier/prettier': 'error'
  }
}
