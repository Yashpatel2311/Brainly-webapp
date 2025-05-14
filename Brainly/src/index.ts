import mongoose from "mongoose";
import { JWT_SECRET, MONGODB_URI, PORT } from "./config";
import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import { Contentmodel, Linkmodel, Usermodel } from "./db";
import { usermiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";

const app = express();

// Configure CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Add your frontend URLs
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Connect to MongoDB with error handling
mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Add type for authenticated request
interface AuthenticatedRequest extends Request {
  userId?: string;
}

// Type for request handlers
type AsyncRequestHandler = (
  req: Request | AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => Promise<void>;

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running! 🚀");
});

app.post("/api/v1/signup", (async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        message: "Username and password are required",
        success: false,
      });
      return;
    }

    const existingUser = await Usermodel.findOne({ username });
    if (existingUser) {
      res.status(400).json({
        message: "Username already exists",
        success: false,
      });
      return;
    }

    const newUser = await Usermodel.create({
      username,
      password,
    });

    // Generate token for immediate sign in after signup
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "User signed up successfully!",
      success: true,
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
      },
      redirect: "/dashboard",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}) as AsyncRequestHandler);

app.post("/api/v1/signin", (async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log("Signin attempt for username:", username);

    // Validate input
    if (!username || !password) {
      console.log("Missing username or password");
      return res.status(400).json({
        message: "Username and password are required",
        success: false,
      });
    }

    // Find user
    const existingUser = await Usermodel.findOne({ username });
    console.log("User found:", existingUser ? "Yes" : "No");

    if (!existingUser) {
      console.log("User not found");
      return res.status(401).json({
        message: "Invalid username or password",
        success: false,
      });
    }

    // Check password
    const isPasswordValid = existingUser.password === password;
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({
        message: "Invalid username or password",
        success: false,
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log("Signin successful, token generated");

    // Send response
    res.status(200).json({
      message: "Sign in successful!",
      success: true,
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}) as AsyncRequestHandler);

app.post("/api/v1/content", usermiddleware, (async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { link, type, title } = req.body;
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await Contentmodel.create({
      link,
      type,
      title,
      userId: req.userId,
      tags: [],
    });

    res.json({ message: "Content added" });
  } catch (error) {
    console.error("Content creation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}) as AsyncRequestHandler);

app.get("/api/v1/content", usermiddleware, (async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const content = await Contentmodel.find({ userId: req.userId }).populate(
      "userId",
      "username"
    );
    res.json({ content });
  } catch (error) {
    console.error("Content fetch error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}) as AsyncRequestHandler);

app.delete("/api/v1/content", usermiddleware, (async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { contentId } = req.body;
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await Contentmodel.deleteMany({
      contentId,
      userId: req.userId,
    });
    res.json({
      message: "deleted",
    });
  } catch (error) {
    console.error("Content deletion error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}) as AsyncRequestHandler);

app.post("/api/v1/brain/share", usermiddleware, (async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { share } = req.body;
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (share) {
      const existinglink = await Linkmodel.findOne({
        userId: req.userId,
      });
      if (existinglink) {
        res.json({
          hash: existinglink.hash,
        });
        return;
      }
      const hash = random(10);
      await Linkmodel.create({
        userId: req.userId,
        hash: hash,
      });
      res.json({
        hash,
      });
    } else {
      await Linkmodel.deleteOne({
        userId: req.userId,
      });
      res.json({
        message: "Removed Link",
      });
    }
  } catch (error) {
    console.error("Share error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}) as AsyncRequestHandler);

app.get("/api/v1/brain/:shareLink", (async (req: Request, res: Response) => {
  try {
    const hash = req.params.shareLink;

    const link = await Linkmodel.findOne({
      hash,
    });

    if (!link) {
      res.status(411).json({
        message: "Sorry incorrect input",
      });
      return;
    }

    const content = await Contentmodel.find({
      userId: link.userId,
    });
    const user = await Usermodel.findOne({
      _id: link.userId,
    });
    if (!user) {
      res.status(411).json({
        message: "user not found",
      });
      return;
    }

    res.json({
      username: user.username,
      content: content,
    });
  } catch (error) {
    console.error("Share link error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}) as AsyncRequestHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
