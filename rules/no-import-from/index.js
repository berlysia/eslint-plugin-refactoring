"use strict";

const { isRegExp } = require("util");

/* @see https://eslint.org/docs/developer-guide/working-with-rules */

function normalizeOption(option) {
  const normalized = [];
  for (const [key, value] of Object.entries(option || {})) {
    if (typeof value === "string" || isRegExp(value)) {
      normalized.push([
        key,
        {
          target: new RegExp(value),
          message: "",
        },
      ]);
      continue;
    }

    normalized.push([
      key,
      {
        target: typeof value.target === "string" ? new RegExp(value.target) : value.target,
        message: value.message ? `: ${value.message}` : "",
      },
    ]);
  }
  return normalized;
}

/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      description: "Ban import statements from specific path",
      category: "Refactoring",
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      {
        type: "object",
        additionalProperties: {
          anyOf: [
            { type: "string" },
            { type: "object" },
            {
              type: "object",
              properties: {
                target: {
                  oneOf: [{ type: "string" }, { type: "object" }],
                },
              },
              additionalProperties: {
                message: { type: "string" },
              },
            },
          ],
        },
      },
    ],
  },

  create(context) {
    const option = normalizeOption(context.options[0]);
    return {
      /** @param {import("estree").ImportDeclaration} node */
      ImportDeclaration(node) {
        const importFrom = node.source.value;
        for (const [name, { target, message }] of option) {
          if (target.test(importFrom)) {
            context.report({
              node,
              message: `Banned import source by {{ name }}{{ message }}`,
              data: {
                name,
                message,
              },
            });
          }
        }
      },
    };
  },
};
