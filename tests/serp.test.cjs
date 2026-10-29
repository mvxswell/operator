/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const ts = require("typescript");

require.extensions[".ts"] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
};

const { SERP_COPY } = require("../src/lib/serpCopy.ts");

test("ranking-page titles and descriptions stay within the search snippet", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const [path, copy] of Object.entries(SERP_COPY)) {
    assert.equal(path.endsWith("/"), false, path);
    assert.ok(copy.title.endsWith(" — Think Operator"), path);
    assert.ok(copy.title.length <= 60, `${path} title ${copy.title.length}: ${copy.title}`);
    assert.ok(copy.description.length >= 140 && copy.description.length <= 155, `${path} description ${copy.description.length}`);
    assert.equal(titles.has(copy.title), false, copy.title);
    assert.equal(descriptions.has(copy.description), false, copy.description);
    titles.add(copy.title);
    descriptions.add(copy.description);
  }
  assert.equal(Object.keys(SERP_COPY).length, 11);
});
