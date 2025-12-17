import { User } from "./user.model.js";
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  phone: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  address: { type: String },
});

export const Customer = User.discriminator("customer", customerSchema);
