/* eslint n/no-process-exit: "off" */
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import { logger } from "../utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    logger.error("[SEED] Missing seed name. Usage: npm run seed <seed-name-1> <seed-name-2> ...");
    process.exit(1);
  }

  for (const name of args) {
    const fileName = `${name}.seed.js`;
    const fullPath = path.join(__dirname, fileName);

    if (!fs.existsSync(fullPath)) {
      logger.error(`[SEED] File not found: ${fileName}`);
      continue;
    }

    logger.info(`[SEED] Running seed: ${fileName}`);

    try {
      const modulePath = `./${fileName}`;
      const seedModule = await import(modulePath);

      if (typeof seedModule.default === "function") {
        await seedModule.default();
      } else if (typeof seedModule.seed === "function") {
        await seedModule.seed();
      } else {
        logger.warn(`[SEED] File ${fileName} does not export a default() or seed() function`);
      }

      logger.info(`[SEED] Finished: ${fileName}`);
    } catch (error) {
      logger.error(`Error running seed ${fileName}:`, error);
    }
  }
  process.exit(0);
}

main();
