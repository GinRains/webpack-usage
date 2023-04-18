module.exports = {
  // root: true, // 根配置，表示是父配置，用到继承时不能为true
  parser: 'babel-eslint',
  // extends: "airbnb",
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    "indent": ["error", 2],
    "quotes": "off",
    "no-console": "off",
    "no-unused-vars": "off",
    "no-param-reassign": "off",
    "import/no-unresolved": "off",
    "comma-dangle": "off"
  }
}