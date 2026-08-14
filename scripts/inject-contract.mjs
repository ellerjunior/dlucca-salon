import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const contract = `<!--
THESIS: Casa D'Lucca treats the salon as a private house and refuses the interchangeable luxury-salon card grid.
OWN-WORLD: Warm mineral fields, void-black rooms, antique-brass hairlines, Brazilian arches, Chicago vertical rules, real photographs and disciplined display type.
STORY: Visitors meet the house, see real work, verify services and prices, understand the people and move directly to booking or contact.
FIRST VIEWPORT: One portrait photograph fills the Home viewport; a left-held three-line title, brass rule, one sentence and booking action sit inside its shadowed edge.
FORM: Brief-pinned Casa D'Lucca, grounded direction 1, seed c2341c99.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

async function htmlFiles(directory) {
  const results = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...(await htmlFiles(target)));
    else if (entry.name.endsWith(".html")) results.push(target);
  }
  return results;
}

for (const file of await htmlFiles(path.resolve("out"))) {
  const html = await readFile(file, "utf8");
  if (html.includes("seed c2341c99")) continue;
  await writeFile(file, html.replace(/(<body[^>]*>)/, `$1${contract}`), "utf8");
}

console.log("Injected the Casa D'Lucca direction contract into static HTML.");
