import mongoose from "mongoose";
import { AppError } from "../utils/AppError.js";

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate follows
followSchema.index({ follower: 1, following: 1 }, { unique: true });

// Prevent self-follow logically
followSchema.pre("save", function (next) {
  if (this.follower.toString() === this.following.toString()) {
    return next(new AppError("A user cannot follow themselves.", 400));
  }
  next();
});

export const Follow = mongoose.model("Follow", followSchema);
