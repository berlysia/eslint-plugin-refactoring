# Ban import statements from specific path (no-import-from)

## Rule Details

In default, this rule reports nothing. It works by giving options, with following schema:

```ts
interface Option {
  [subRuleName: string]:
    | {
        target: string | RegExp; // RegExp is only in .js
        message?: string;
      }
    | string // same as { target: "some string" }
    | RegExp; //  same as { target: /some regexp/ } (only in .js)
}
```

`target` is passed to `RegExp` constructor in the normalization. `message` and `subRuleName` are used in report messages.

---

The following example is with the following options:

```ts
  "@berlysia/refactoring/no-import-from": ["error", {
    "no-some-module": {
      target: "^some-module$",
      message: "'some-module' is banned"
    }
  }]
```

Examples of **incorrect** code for this rule:

```js
import someModule from "some-module";
import * as someModule from "some-module";
import { some } from "some-module";
import "some-module";
```

Examples of **correct** code for this rule:

```js
import someSubModule from "some-module/sub";
import * as someSubModule from "some-module/sub";
import { sub } from "some-module/sub";
import "some-module/sub";
```
