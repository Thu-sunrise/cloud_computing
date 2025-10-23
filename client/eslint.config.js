import base from "../eslint.config.js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  ...base,
  {
    files: ["**/*.{js,jsx}"],
    plugins: { react, reactHooks },
    extends: [
      "plugin:react/recommended",
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: global.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
];
