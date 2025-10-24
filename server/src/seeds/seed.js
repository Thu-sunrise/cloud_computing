/* eslint n/no-process-exit: "off" */
import { User } from "../models/user.model.js";
import { connectDB } from "../config/db.js";
import { logger } from "../utils/logger.js";

const seedUsers = [
  { mail: "an@example.com", password: "123456" },
  { mail: "thu@example.com", password: "654321" },
  { mail: "kiet@example.com", password: "112233" },
];

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();

    await User.insertMany(seedUsers);
    logger.info("Seed data imported successfully");
    process.exit();
  } catch (error) {
    console.error("Error", error);
    process.exit(1);
  }
};

importData();
