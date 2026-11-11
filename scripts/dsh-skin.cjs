#!/usr/bin/env node
/**
 * Convenience wrapper: delegates to the dsh-skins tooling when available.
 * Usage: node scripts/dsh-skin.cjs <validate|install|use|list|current> [args]
 */
const { existsSync } = require("node:fs");
const { join } = require("node:path");

const candidates = [
  process.env.DSH_SKINS_TOOLING,
  join(__dirname, "..", "..", "dsh-skins", "scripts", "dsh-skin.cjs"),
  join(__dirname, "dsh-skin.cjs"),
].filter(Boolean);

for (const p of candidates) {
  if (existsSync(p)) {
    const { spawnSync } = require("node:child_process");
    const r = spawnSync(process.execPath, [p, ...process.argv.slice(2)], { stdio: "inherit" });
    process.exit(r.status ?? 1);
  }
}
console.error("dsh-skin tooling not found. Clone https://github.com/zhu1090093659/dsh-skins and set DSH_SKINS_TOOLING to its scripts/dsh-skin.cjs.");
process.exit(1);
