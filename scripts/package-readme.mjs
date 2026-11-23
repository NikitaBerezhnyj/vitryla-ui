import { copyFileSync, existsSync, renameSync, rmSync } from "node:fs";

const BACKUP = ".README.repo.bak";
const mode = process.argv[2];

if (mode === "apply") {
  if (existsSync(BACKUP)) {
    throw new Error(
      `${BACKUP} already exists: a previous run did not finish. Run "npm run readme:restore" first.`
    );
  }
  renameSync("README.md", BACKUP);
  copyFileSync("docs/README.md", "README.md");
} else if (mode === "restore") {
  if (existsSync(BACKUP)) {
    rmSync("README.md", { force: true });
    renameSync(BACKUP, "README.md");
  }
} else {
  throw new Error("Usage: node scripts/package-readme.mjs <apply|restore>");
}
