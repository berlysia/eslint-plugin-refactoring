"use strict";

const fs = require("fs");
const path = require("path");

function loadRule(ruleName) {
  // eslint-disable-next-line import/no-dynamic-require
  const rule = require(path.join(__dirname, "rules", ruleName));

  return rule;
}

const rules = fs
  .readdirSync(path.join(__dirname, "rules"))
  .reduce((obj, name) => Object.assign(obj, { [name]: loadRule(name) }), {});

module.exports.rules = rules;
