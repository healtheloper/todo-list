module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
  },
  env: {
    browser: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error",
  },
};
