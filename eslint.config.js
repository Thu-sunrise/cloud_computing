import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules", "dist", "build", "coverage", "eslint.config.js"],
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
    },
  },
  js.configs.recommended,
  prettier,
];
