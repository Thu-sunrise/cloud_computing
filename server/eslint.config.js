import base from "../eslint.config.js";
import n from "eslint-plugin-n";
import security from "eslint-plugin-security";

export default [
  ...base,
  {
    files: ["**/*.js"],
    plugins: { n, security },
    extends: ["plugin:n/recommended", "plugin:security/recommended"],
    languageOptions: {
      globals: global.node,
    },
    rules: {
      "n/no-missing-import": "off",
      "security/detect-object-injection": "off",
    },
  },
];
