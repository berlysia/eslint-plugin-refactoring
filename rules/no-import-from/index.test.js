"use strict";

/* @see https://eslint.org/docs/developer-guide/nodejs-api#ruletester */

const { RuleTester } = require("eslint");
const rule = require("./");

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
});

ruleTester.run("no-import-from", rule, {
  valid: ['import fs from "fs"', 'import * as fs from "fs"'],

  invalid: [
    {
      code: 'import styles from "./style.css";',
      options: [
        {
          "no-css-modules": {
            target: "\\.css$",
            message: "CSS Modules are not allowed",
          },
        },
      ],
      errors: [
        {
          message: "Banned import source by no-css-modules: CSS Modules are not allowed",
        },
      ],
    },
    {
      code: 'import styles from "./style.css";',
      options: [
        {
          "no-css-modules": {
            target: /\.css$/,
            message: "CSS Modules are not allowed",
          },
        },
      ],
      errors: [
        {
          message: "Banned import source by no-css-modules: CSS Modules are not allowed",
        },
      ],
    },
    {
      code: 'import styles from "./style.css";',
      options: [
        {
          "no-css-modules": {
            target: "\\.css$",
          },
        },
      ],
      errors: [
        {
          message: "Banned import source by no-css-modules",
        },
      ],
    },
    {
      code: 'import styles from "./style.css";',
      options: [
        {
          "no-css-modules": {
            target: /\.css$/,
          },
        },
      ],
      errors: [
        {
          message: "Banned import source by no-css-modules",
        },
      ],
    },
    {
      code: 'import styles from "./style.css";',
      options: [
        {
          "no-css-modules": "\\.css$",
        },
      ],
      errors: [
        {
          message: "Banned import source by no-css-modules",
        },
      ],
    },
    {
      code: 'import styles from "./style.css";',
      options: [
        {
          "no-css-modules": /\.css$/,
        },
      ],
      errors: [
        {
          message: "Banned import source by no-css-modules",
        },
      ],
    },
  ],
});
