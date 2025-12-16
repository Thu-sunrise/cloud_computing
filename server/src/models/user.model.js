import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    mail: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    avatarPublicId: { type: String, default: "avtdf_kvmacl" },
  },
  { timestamps: true, discriminatorKey: "role" }
);

userSchema.pre("save", async function (next) {
  // Hash password before saving
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (pw) {
  return await bcrypt.compare(pw, this.password);
};

export const User = mongoose.model("User", userSchema);
