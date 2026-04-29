#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const repo = "carrilloapps/carrilloapps";

function gh(args) {
  const result = spawnSync("gh", args, { encoding: "utf8" });
  if (result.status !== 0) {
    return { ok: false, stderr: result.stderr, stdout: result.stdout };
  }
  return { ok: true, stdout: result.stdout };
}

async function main() {
  let total = 0;
  let deleted = 0;
  let failed = 0;
  while (true) {
    const list = gh(["api", `repos/${repo}/deployments`, "--paginate", "--jq", ".[].id"]);
    if (!list.ok) {
      console.error("Failed to list deployments:", list.stderr);
      process.exit(1);
    }
    const ids = list.stdout.trim().split("\n").filter(Boolean);
    if (ids.length === 0) break;
    if (total === 0) total = ids.length;
    for (const id of ids) {
      const inactive = gh([
        "api",
        "--method", "POST",
        `repos/${repo}/deployments/${id}/statuses`,
        "-f", "state=inactive",
      ]);
      const del = gh(["api", "--method", "DELETE", `repos/${repo}/deployments/${id}`]);
      if (del.ok) {
        deleted++;
        process.stdout.write(`\r[${deleted}/${total}] deleted ${id}        `);
      } else {
        failed++;
        console.error(`\nFailed to delete ${id}:`, del.stderr);
      }
    }
    if (ids.length < 30) break;
  }
  console.log(`\nDone. deleted=${deleted} failed=${failed}`);
}

await main();
