/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const root = path.resolve(__dirname, "../src");

test("non-quiz client import graphs exclude full banks, solutions and the Supabase implementation", () => {
  const roots = ["app/page.tsx", "components/Nav.tsx", "components/GuideScenario.tsx", "components/CaseExercise.tsx", "components/CaseLibrary.tsx"];
  for (const entry of roots) {
    const seen = new Set();
    const pending = [path.join(root, entry)];
    while (pending.length) {
      const file = pending.pop();
      if (seen.has(file)) continue;
      seen.add(file);
      const relative = path.relative(root, file).replaceAll("\\", "/");
      assert.ok(!/^(?:data\/(?:index|daily|quick)\.ts|data\/questions\/|content\/cases\/solutions\/)/.test(relative), `${entry} eagerly imports ${relative}`);
      const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
      for (const statement of source.statements) {
        if (!ts.isImportDeclaration(statement) || statement.importClause?.isTypeOnly) continue;
        const specifier = statement.moduleSpecifier.text;
        assert.ok(!specifier.startsWith("@supabase/"), `${entry}: eager SDK import`);
        const base = specifier.startsWith("@/") ? path.join(root, specifier.slice(2)) : specifier.startsWith(".") ? path.resolve(path.dirname(file), specifier) : null;
        if (!base) continue;
        const target = [base + ".ts", base + ".tsx", path.join(base, "index.ts")].find(fs.existsSync);
        if (target) pending.push(target);
      }
    }
  }
});
