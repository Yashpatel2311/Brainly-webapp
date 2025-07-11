"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linkmodel = exports.Contentmodel = exports.Usermodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Userschema = new mongoose_2.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});
// Add index for faster queries
Userschema.index({ username: 1 });
// Hash password before saving
Userschema.pre("save", function (next) {
  return __awaiter(this, void 0, void 0, function* () {
    if (this.isModified("password")) {
      this.password = yield bcryptjs_1.default.hash(this.password, 10);
    }
    next();
  });
});
// Method to compare password
Userschema.methods.comparePassword = function (candidatePassword) {
  return __awaiter(this, void 0, void 0, function* () {
    return bcryptjs_1.default.compare(candidatePassword, this.password);
  });
};
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
  userId: {
    type: mongoose_1.default.Types.ObjectId,
    ref: "users",
    required: true,
  },
});
// Add indexes for faster queries
contentSchema.index({ userId: 1 });
contentSchema.index({ type: 1 });
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
