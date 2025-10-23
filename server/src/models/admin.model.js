import { User } from "./user.model.js";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({});

export const Admin = User.discriminator("admin", adminSchema);
