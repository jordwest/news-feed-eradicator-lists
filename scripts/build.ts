import { UTCDate } from "@date-fns/utc";
import { format } from "date-fns";
import { execSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sitelistSource from "../src/sitelist/_index";
import type { Manifest, SiteList } from "../src/types/sitelist";

const outDir = fileURLToPath(new URL("../dist/", import.meta.url));

const getCommit = (): string => {
	if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;
	return execSync("git rev-parse HEAD", { encoding: "utf8" }).trim();
};

// UTC, formatted YYYYMMDD_HHMMSS
const getBuildTimestamp = (): string => format(new UTCDate(), "yyyyMMdd_HHmmss");

const commit = getCommit();
const buildTimestamp = getBuildTimestamp();

const sitelist: SiteList = {
	schemaVersion: sitelistSource.schemaVersion,
	commit,
	buildTimestamp,
	sites: sitelistSource.sites,
};

const manifest: Manifest = { commit, buildTimestamp };

await mkdir(outDir, { recursive: true });

// Minified copy for clients; pretty-printed copy for readability/diffing.
await writeFile(`${outDir}sitelist.json`, JSON.stringify(sitelist) + "\n");
await writeFile(`${outDir}sitelist.pretty.json`, JSON.stringify(sitelist, null, 2) + "\n");
await writeFile(`${outDir}manifest.json`, JSON.stringify(manifest, null, 2) + "\n");

console.log(`Wrote ${sitelist.sites.length} sites (${commit} @ ${buildTimestamp}) to ${outDir}`);
