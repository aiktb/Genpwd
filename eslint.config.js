import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import vue from "eslint-plugin-vue";
import globals from "globals";
import vueParser from "vue-eslint-parser";

/** @type {import('eslint').Linter.FlatConfig[]} */

export default [
  {
    ignores: ["build", ".plasmo"],
  },
  {
    files: ["**/*.{ts,vue}"],
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      ...vue.configs["vue3-essential"].rules,
      ...prettier.rules,
      "prefer-const": "error",
      "vue/multi-word-component-names": "off",
    },
    plugins: {
      "@typescript-eslint": typescript,
      vue,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        project: "./tsconfig.json",
        parser: typescriptParser,
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
      globals: {
        ...globals.browser,
      },
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
  },
];
