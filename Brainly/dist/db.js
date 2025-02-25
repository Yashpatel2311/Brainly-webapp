"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linkmodel = exports.Contentmodel = exports.Usermodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const Userschema = new mongoose_2.Schema({
    username: { type: "string", unique: true, require: true },
    password: { type: "string", unique: true, require: true },
});
exports.Usermodel = (0, mongoose_2.model)("users", Userschema);
// const contentTypes = [
//   "image",
//   "video",
//   "article",
//   "audio",
//   "twitter",
//   "youtube",
// ]; // Extend as needed
const contentSchema = new mongoose_2.Schema({
    link: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: "Tag" }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "users", required: true },
});
exports.Contentmodel = (0, mongoose_2.model)("content", contentSchema);
const LinkSchema = new mongoose_2.Schema({
    hash: String,
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "users",
        required: true,
        unique: true,
    },
});
exports.Linkmodel = (0, mongoose_2.model)("link", LinkSchema);
