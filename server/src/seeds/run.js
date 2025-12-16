/* eslint n/no-process-exit: "off" */
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { connectDB, disconnectDB } from "../config/db.js";
import { logger } from "../utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    logger.error("[SEED] Missing seed name. Usage: npm run seed [d] [all] [seed-name]");
    process.exit(1);
  }

  await connectDB();

  const shouldRunAll = args.includes("all");

  let seedFiles = [];

  if (shouldRunAll) {
    seedFiles = fs.readdirSync(__dirname).filter((f) => f.endsWith(".seed.js"));
  } else {
    const allSeedFiles = fs.readdirSync(__dirname);
    seedFiles = allSeedFiles.filter((file) =>
      args.filter((a) => a !== "d").some((name) => file.endsWith(`${name}.seed.js`))
    );
  }

  for (const file of seedFiles) {
    const fullPath = path.join(__dirname, file);

    if (!fs.existsSync(fullPath)) {
      logger.error(`[SEED] File not found: ${file}`);
      continue;
    }

    logger.info(`[SEED] Running seed: ${file}`);

    try {
      const seedModule = await import(`./${file}`);
      if (typeof seedModule.seed === "function") {
        await seedModule.seed();
      } else {
        logger.warn(`[SEED] ${file} has no valid export`);
      }
    } catch (error) {
      logger.error(`[SEED] Error running ${file}`, error);
    }
  }

  await disconnectDB();
  process.exit(0);
}

main();
