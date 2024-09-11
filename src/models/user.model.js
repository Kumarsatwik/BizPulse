import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Make password optional for Google users
    googleId: { type: String, unique: true }, // Add googleId field for Google OAuth
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
