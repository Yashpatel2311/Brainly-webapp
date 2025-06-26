import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Environment variables with fallbacks
export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/brainly";
export const PORT = process.env.PORT || 3000;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
