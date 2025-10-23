import { User } from "./user.model.js";
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  phone: String,
  address: String,
  date_of_birth: Date,
});

export const Customer = User.discriminator("customer", customerSchema);
