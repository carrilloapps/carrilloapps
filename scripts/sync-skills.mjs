#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { cp, mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(fileURLToPath(import.meta.url), "..", "..");
const lockPath = join(repoRoot, "skills-lock.json");
const targetRoots = [
  join(repoRoot, ".agents", "skills"),
  join(repoRoot, ".claude", "skills"),
];

const args = new Set(process.argv.slice(2));
const updateMode = args.has("--update");
const verifyOnly = args.has("--verify");

async function main() {
  if (!existsSync(lockPath)) {
    fail(`skills-lock.json not found at ${lockPath}`);
  }
  const lock = JSON.parse(await readFile(lockPath, "utf8"));
  const skills = lock.skills ?? {};
  const names = Object.keys(skills).sort();
  if (names.length === 0) {
    console.log("No skills declared in skills-lock.json — nothing to do.");
    return;
  }

  for (const target of targetRoots) {
    await mkdir(target, { recursive: true });
  }

  let lockMutated = false;
  let mismatch = false;

  for (const name of names) {
    const entry = skills[name];
    if (entry.sourceType !== "github") {
      console.warn(`[skip] ${name}: unsupported sourceType "${entry.sourceType}"`);
      continue;
    }

    const sourceLabel = entry.path ? `${entry.source}:${entry.path}` : entry.source;
    process.stdout.write(`[sync] ${name} <- ${sourceLabel} … `);
    const skillSrc = await fetchSkill(name, entry.source, entry.path);
    const computedHash = await hashDir(skillSrc);

    if (entry.computedHash && entry.computedHash !== computedHash) {
      if (updateMode) {
        entry.computedHash = computedHash;
        lockMutated = true;
        process.stdout.write("updated hash ");
      } else {
        mismatch = true;
        process.stdout.write(`HASH MISMATCH (lock=${entry.computedHash.slice(0, 12)}… actual=${computedHash.slice(0, 12)}…) `);
      }
    } else if (!entry.computedHash) {
      entry.computedHash = computedHash;
      lockMutated = true;
      process.stdout.write("recorded hash ");
    }

    if (!verifyOnly) {
      for (const target of targetRoots) {
        const dest = join(target, name);
        await rm(dest, { recursive: true, force: true });
        await mkdir(dirname(dest), { recursive: true });
        await cp(skillSrc, dest, { recursive: true });
      }
    }
    console.log("ok");
  }

  if (lockMutated && !verifyOnly) {
    await writeFile(lockPath, JSON.stringify(lock, null, 2) + "\n", "utf8");
    console.log("[lock] skills-lock.json updated");
  }

  if (mismatch && !updateMode) {
    fail("One or more skills do not match the lock. Re-run with --update to refresh hashes.");
  }
}

async function fetchSkill(name, source, explicitPath) {
  const tmp = await mkdtemp(join(tmpdir(), "skills-"));
  const url = `https://github.com/${source}.git`;
  const result = spawnSync("git", ["clone", "--depth=1", "--quiet", url, tmp], {
    stdio: ["ignore", "ignore", "inherit"],
  });
  if (result.status !== 0) {
    fail(`git clone failed for ${source}`);
  }
  if (explicitPath) {
    const target = join(tmp, explicitPath);
    if (existsSync(target)) {
      return target;
    }
    fail(`Skill "${name}" not found at "${explicitPath}" inside ${source}.`);
  }
  const candidates = [
    join(tmp, "skills", name),
    join(tmp, name),
    join(tmp, ".claude", "skills", name),
    join(tmp, ".agents", "skills", name),
    join(tmp, "agents", "skills", name),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  fail(
    `Skill "${name}" not found inside ${source}. Looked in: ` +
      candidates.map((c) => c.slice(tmp.length + 1) || "<root>").join(", ")
  );
}

async function hashDir(dir) {
  const files = [];
  await collectFiles(dir, files);
  files.sort();
  const hash = createHash("sha256");
  for (const rel of files) {
    const buf = await readFile(join(dir, rel));
    hash.update(rel.replace(/\\/g, "/"));
    hash.update("\0");
    hash.update(buf);
    hash.update("\0");
  }
  return hash.digest("hex");
}

async function collectFiles(dir, out, base = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === ".git") continue;
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      await collectFiles(join(dir, entry.name), out, rel);
    } else if (entry.isFile()) {
      out.push(rel);
    }
  }
}

function fail(msg) {
  console.error(`\n[skills-sync] ${msg}`);
  process.exit(1);
}

await main();
