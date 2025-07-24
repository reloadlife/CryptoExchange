#!/usr/bin/env node

import { execSync } from "child_process";
import { existsSync } from "fs";
import path from "path";

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("Usage: pnpm run shadcn <app> <command> [args...]");
  console.error("Example: pnpm run shadcn web init");
  console.error("Example: pnpm run shadcn web add button");
  process.exit(1);
}

const [app, ...shadcnArgs] = args;
const appPath = path.join("apps", app);

if (!existsSync(appPath)) {
  console.error(`App "${app}" not found in apps directory`);
  process.exit(1);
}

const command = `cd ${appPath} && pnpm dlx shadcn@latest ${shadcnArgs.join(
  " "
)}`;

try {
  execSync(command, { stdio: "inherit" });
} catch (error) {
  console.error(`Command failed: ${command}`);
  process.exit(error.status || 1);
}
