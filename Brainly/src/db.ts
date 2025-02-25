import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const Userschema = new Schema({
  username: { type: "string", unique: true, require: true },
  password: { type: "string", unique: true, require: true },
});

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
