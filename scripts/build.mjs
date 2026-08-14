import { spawnSync } from "node:child_process";

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit", shell: false });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run("npm", ["run", "images"]);
run("node", ["node_modules/next/dist/bin/next", "build"]);
run("node", ["scripts/inject-contract.mjs"]);
