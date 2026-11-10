import { access, readFile, readlink } from "node:fs/promises";
import process from "node:process";

const errors = [];
async function exists(filePath) {
  try { await access(filePath); return true; } catch { return false; }
}

const pkg = JSON.parse(await readFile("package.json", "utf8"));
const nodeMajor = Number(process.versions.node.split(".")[0]);
const workspace = await readFile("pnpm-workspace.yaml", "utf8");

if (nodeMajor !== 26) errors.push(`Se esperaba Node.js 26.x, pero se encontró ${process.versions.node}. Utiliza .nvmrc/.node-version.`);
if (!String(pkg.packageManager ?? "").startsWith("pnpm@12.")) errors.push("package.json debe fijar pnpm 12.x.");
if (!workspace.includes("apps/*") || !workspace.includes("packages/*")) errors.push("pnpm-workspace.yaml debe incluir apps/* y packages/*.");

for (const directory of ["apps/web", "apps/api", "packages/contracts", "infra", "docs", ".agents/skills", "scripts/engineering"]) {
  if (!await exists(directory)) errors.push(`Falta el directorio esperado: ${directory}`);
}

try {
  const target = await readlink(".claude/skills");
  if (target !== "../.agents/skills") errors.push(`El enlace .claude/skills debe apuntar a ../.agents/skills, no a: ${target}`);
  if (!await exists(".claude/skills")) errors.push("El enlace .claude/skills está roto.");
} catch {
  errors.push("Falta el enlace simbólico .claude/skills a ../.agents/skills.");
}

if (errors.length) {
  console.error("La validación del workspace ha fallado:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Validación del workspace correcta.");
}
