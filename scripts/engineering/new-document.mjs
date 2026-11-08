import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const kind = process.argv[2];
const rawSlug = process.argv[3];
if (!["requirement", "adr", "plan"].includes(kind) || !rawSlug) {
  console.error("Uso: pnpm run new:requirement -- <slug> | new:adr -- <slug> | new:plan -- <slug>");
  process.exit(1);
}

const slug = rawSlug.normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
if (!slug) throw new Error("Indica un slug que contenga al menos una letra o un número.");

async function exists(filePath) {
  try { await access(filePath); return true; } catch { return false; }
}
async function nextId(directory, prefix, width) {
  const entries = await readdir(directory);
  const expression = new RegExp(`^${prefix}-(\\d{${width}})-`);
  const ids = entries.map((name) => name.match(expression)?.[1]).filter(Boolean).map(Number);
  return String(Math.max(0, ...ids) + 1).padStart(width, "0");
}

if (kind === "requirement") {
  const id = await nextId("docs/requirements", "REQ", 3);
  const filePath = path.join("docs/requirements", `REQ-${id}-${slug}.md`);
  const template = await readFile("docs/templates/requirement.md", "utf8");
  const content = template.replaceAll("REQ-XXX", `REQ-${id}`).replace("<Título breve del requisito>", slug.replaceAll("-", " "));
  if (await exists(filePath)) throw new Error(`El archivo ya existe: ${filePath}`);
  await writeFile(filePath, content, { flag: "wx" });
  console.log(`Creado ${filePath}`);
} else if (kind === "adr") {
  const id = await nextId("docs/decisions", "ADR", 4);
  const filePath = path.join("docs/decisions", `ADR-${id}-${slug}.md`);
  const template = await readFile("docs/templates/adr.md", "utf8");
  const content = template.replaceAll("ADR-XXXX", `ADR-${id}`).replace("<Título de la decisión>", slug.replaceAll("-", " "));
  if (await exists(filePath)) throw new Error(`El archivo ya existe: ${filePath}`);
  await writeFile(filePath, content, { flag: "wx" });
  console.log(`Creado ${filePath}`);
} else {
  const directory = path.join("plans/active", slug);
  if (await exists(directory)) throw new Error(`El plan ya existe: ${directory}`);
  await mkdir(directory, { recursive: true });
  const plan = await readFile("docs/templates/implementation-plan.md", "utf8");
  const progress = await readFile("docs/templates/progress.md", "utf8");
  const title = slug.replaceAll("-", " ");
  await writeFile(path.join(directory, "plan.md"), plan.replace("<título>", title), { flag: "wx" });
  await writeFile(path.join(directory, "progress.md"), progress.replace("<título>", title), { flag: "wx" });
  console.log(`Plan creado en ${directory}`);
}
