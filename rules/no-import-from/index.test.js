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

ruleTester.run("no-import-from: option pattern", rule, {
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

const DOC_OPTION = [
  {
    "no-some-module": {
      target: "^some-module$",
      message: "'some-module' is banned",
    },
  },
];
ruleTester.run("no-import-from: document validation", rule, {
  valid: [
    `import someSubModule from "some-module/sub";`,
    `import * as someSubModule from "some-module/sub";`,
    `import { sub } from "some-module/sub";`,
    `import "some-module/sub";`,
  ].map(code => ({
    code,
    options: DOC_OPTION,
  })),
  invalid: [
    `import someModule from "some-module";`,
    `import * as someModule from "some-module";`,
    `import { some } from "some-module";`,
    `import "some-module";`,
  ].map(code => ({
    code,
    options: DOC_OPTION,
    errors: [
      {
        message: "Banned import source by no-some-module: 'some-module' is banned",
      },
    ],
  })),
});
