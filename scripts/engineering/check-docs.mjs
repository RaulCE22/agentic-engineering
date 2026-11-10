import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const requiredFiles = [
  "README.md", "AGENTS.md", "CLAUDE.md", "GEMINI.md",
  "docs/README.md", "docs/agents/README.md",
  "docs/agents/compatibilidad.md", "docs/agents/puesta-en-marcha.md",
  "docs/requirements/README.md",
  "docs/architecture/overview.md", "docs/architecture/backend.md",
  "docs/architecture/frontend.md", "docs/architecture/pending-decisions.md",
  "docs/quality/quality-gates.md", "docs/quality/language-policy.md",
  "docs/decisions/README.md",
  ".agents/skills/feature-discovery/SKILL.md",
  ".agents/skills/feature-planning/SKILL.md",
  ".agents/skills/feature-implementation/SKILL.md",
  ".agents/skills/test-and-verify/SKILL.md",
  ".agents/skills/code-review/SKILL.md"
];
const errors = [];

async function exists(filePath) {
  try { await access(filePath); return true; } catch { return false; }
}

async function collectMarkdown(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    if ([".git", "node_modules", "dist", "coverage"].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await collectMarkdown(fullPath));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) result.push(fullPath);
  }
  return result;
}

for (const file of requiredFiles) {
  if (!await exists(path.join(root, file))) errors.push(`Falta el archivo obligatorio: ${file}`);
}

const markdownFiles = await collectMarkdown(root);
for (const filePath of markdownFiles) {
  const source = await readFile(filePath, "utf8");
  const content = source.replace(/```[sS]*?```/g, "");
  const pattern = /(?<!!)[[^]]*](([^)s]+)(?:s+[^)]*)?)/g;
  let match;
  while ((match = pattern.exec(content)) !== null) {
    const target = match[1].replace(/^<|>$/g, "");
    if (/^(https?:|mailto:|tel:|#)/i.test(target)) continue;
    const clean = decodeURIComponent(target.split("#")[0].split("?")[0]);
    if (!clean) continue;
    const resolved = path.resolve(path.dirname(filePath), clean);
    if (!await exists(resolved)) errors.push(`Enlace Markdown roto en ${path.relative(root, filePath)}: ${target}`);
  }
}

const skillRoot = path.join(root, ".agents/skills");
const skillEntries = await readdir(skillRoot, { withFileTypes: true });
for (const entry of skillEntries.filter((item) => item.isDirectory())) {
  const skillPath = path.join(skillRoot, entry.name, "SKILL.md");
  if (!await exists(skillPath)) {
    errors.push(`La skill no contiene SKILL.md: ${entry.name}`);
    continue;
  }
  const source = await readFile(skillPath, "utf8");
  const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!frontmatter) {
    errors.push(`Faltan los metadatos iniciales de la skill: ${entry.name}`);
    continue;
  }
  const name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (name !== entry.name) errors.push(`El identificador name debe coincidir con el directorio: ${entry.name}`);
  if (!description || description.length < 20) errors.push(`La descripción de la skill falta o es demasiado breve: ${entry.name}`);
}

if (errors.length) {
  console.error("La validación de documentación ha fallado:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Validación de documentación correcta (${markdownFiles.length} archivos Markdown; ${requiredFiles.length} archivos obligatorios).`);
}
