/* eslint n/no-process-exit: "off" */
import { Admin } from "../models/admin.model.js";

import seedAdmins from "./data/admin.json" with { type: "json" };
import { logger } from "../utils/logger.js";

export const seed = async () => {
  try {
    await Admin.deleteMany();

    for (const admin of seedAdmins) {
      await Admin.create({ ...admin });
    }
  } catch (error) {
    logger.error("[SEED] Error", error);
  }
};
