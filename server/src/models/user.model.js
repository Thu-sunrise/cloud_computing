import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    mail: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    // last login, created at, updated at will be handled by timestamps
  },
  { timestamps: true, discriminatorKey: "role" }
);

userSchema.pre("save", async function (next) {
  // Hash password before saving
  if (this.isModified("password")) {
    // Only hash if password is modified
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = function (pw) {
  return bcrypt.compare(pw, this.password);
};

export const User = mongoose.model("User", userSchema);
