import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sitelist from "../src/sitelist/_index";

const outDir = fileURLToPath(new URL("../dist/", import.meta.url));

await mkdir(outDir, { recursive: true });

// Pretty-printed for readability/diffing; minified copy for clients.
await writeFile(`${outDir}sitelist.json`, JSON.stringify(sitelist) + "\n");
await writeFile(`${outDir}sitelist.pretty.json`, JSON.stringify(sitelist, null, 2) + "\n");

console.log(`Wrote ${sitelist.sites.length} sites to ${outDir}`);
