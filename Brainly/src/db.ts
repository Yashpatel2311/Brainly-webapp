import mongoose from "mongoose";
import { model, Schema } from "mongoose";
<<<<<<< HEAD
import bcrypt from "bcryptjs";
=======
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57

const Userschema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
<<<<<<< HEAD
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
=======
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
<<<<<<< HEAD
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
Userschema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
Userschema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};
=======
});

// Add index for faster queries
Userschema.index({ username: 1 });
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57

export const Usermodel = model("users", Userschema);

// const contentTypes = [
//   "image",
//   "video",
//   "article",
//   "audio",
//   "twitter",
//   "youtube",
// ]; // Extend as needed

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
});

export const Contentmodel = model("content", contentSchema);

const LinkSchema = new Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
});
export const Linkmodel = model("link", LinkSchema);
