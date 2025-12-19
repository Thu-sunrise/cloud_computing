import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Provider = mongoose.model("Provider", providerSchema);
