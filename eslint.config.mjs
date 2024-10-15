export default {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: {
    "@typescript-eslint": "@typescript-eslint/eslint-plugin",
    prettier: "eslint-plugin-prettier",
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "prettier/prettier": "error",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
