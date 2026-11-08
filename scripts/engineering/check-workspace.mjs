import { access, readFile } from "node:fs/promises";
import process from "node:process";

const errors = [];
async function exists(filePath) {
  try { await access(filePath); return true; } catch { return false; }
}

const pkg = JSON.parse(await readFile("package.json", "utf8"));
const nodeMajor = Number(process.versions.node.split(".")[0]);
const workspace = await readFile("pnpm-workspace.yaml", "utf8");

if (nodeMajor !== 26) errors.push(`Expected Node.js 26.x, found ${process.versions.node}. Use .nvmrc/.node-version.`);
if (!String(pkg.packageManager ?? "").startsWith("pnpm@12.")) errors.push("package.json must pin pnpm 12.x.");
if (!workspace.includes("apps/*") || !workspace.includes("packages/*")) errors.push("pnpm-workspace.yaml must include apps/* and packages/*.");

for (const directory of ["apps/web", "apps/api", "packages/contracts", "infra", "docs", ".agents/skills", "scripts/engineering"]) {
  if (!await exists(directory)) errors.push(`Missing expected directory: ${directory}`);
}

if (!await exists(".claude/skills")) {
  console.warn("Warning: .claude/skills link is missing; Claude Code may not discover the shared skills.");
}

if (errors.length) {
  console.error("Workspace validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Workspace validation passed.");
}
