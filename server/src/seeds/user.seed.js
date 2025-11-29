/* eslint n/no-process-exit: "off" */
import bcrypt from "bcryptjs";

import { User } from "../models/user.model.js";
import { Customer } from "../models/customer.model.js";
import { Admin } from "../models/admin.model.js";

import { connectDB } from "../config/db.js";
import seedUsers from "./data/user.json" with { type: "json" };
import { logger } from "../utils/logger.js";

export const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany();

    for (const user of seedUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      if (user.role === "customer") {
        await Customer.create({
          ...user,
          password: hashedPassword,
        });
      } else if (user.role === "admin") {
        await Admin.create({
          ...user,
          password: hashedPassword,
        });
      }
    }
  } catch (error) {
    logger.error("[SEED] Error", error);
  }
};
