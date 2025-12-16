import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: { type: String },
  imagePublicId: { type: String },
});

export const Category = mongoose.model("Category", categorySchema);
