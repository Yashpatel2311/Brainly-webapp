"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Configure CORS
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Add your frontend URLs
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});
// Connect to MongoDB with error handling
mongoose_1.default
    .connect(config_1.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});
app.get("/", (req, res) => {
    res.send("Backend is running! 🚀");
});
app.post("/api/v1/signup", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({
                message: "Username and password are required",
                success: false,
            });
            return;
        }
        const existingUser = yield db_1.Usermodel.findOne({ username });
        if (existingUser) {
            res.status(400).json({
                message: "Username already exists",
                success: false,
            });
            return;
        }
        const newUser = yield db_1.Usermodel.create({
            username,
            password,
        });
        // Generate token for immediate sign in after signup
        const token = jsonwebtoken_1.default.sign({
            id: newUser._id,
        }, config_1.JWT_SECRET, { expiresIn: "24h" });
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
    }
    catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
})));
app.post("/api/v1/signin", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingUser = yield db_1.Usermodel.findOne({ username });
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
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id,
        }, config_1.JWT_SECRET, { expiresIn: "24h" });
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
    }
    catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
})));
app.post("/api/v1/content", middleware_1.usermiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, type, title } = req.body;
        if (!req.userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        yield db_1.Contentmodel.create({
            link,
            type,
            title,
            userId: req.userId,
            tags: [],
        });
        res.json({ message: "Content added" });
    }
    catch (error) {
        console.error("Content creation error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})));
app.get("/api/v1/content", middleware_1.usermiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const content = yield db_1.Contentmodel.find({ userId: req.userId }).populate("userId", "username");
        res.json({ content });
    }
    catch (error) {
        console.error("Content fetch error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})));
app.delete("/api/v1/content", middleware_1.usermiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contentId } = req.body;
        if (!req.userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        yield db_1.Contentmodel.deleteMany({
            contentId,
            userId: req.userId,
        });
        res.json({
            message: "deleted",
        });
    }
    catch (error) {
        console.error("Content deletion error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})));
app.post("/api/v1/brain/share", middleware_1.usermiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { share } = req.body;
        if (!req.userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if (share) {
            const existinglink = yield db_1.Linkmodel.findOne({
                userId: req.userId,
            });
            if (existinglink) {
                res.json({
                    hash: existinglink.hash,
                });
                return;
            }
            const hash = (0, utils_1.random)(10);
            yield db_1.Linkmodel.create({
                userId: req.userId,
                hash: hash,
            });
            res.json({
                hash,
            });
        }
        else {
            yield db_1.Linkmodel.deleteOne({
                userId: req.userId,
            });
            res.json({
                message: "Removed Link",
            });
        }
    }
    catch (error) {
        console.error("Share error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})));
app.get("/api/v1/brain/:shareLink", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = req.params.shareLink;
        const link = yield db_1.Linkmodel.findOne({
            hash,
        });
        if (!link) {
            res.status(411).json({
                message: "Sorry incorrect input",
            });
            return;
        }
        const content = yield db_1.Contentmodel.find({
            userId: link.userId,
        });
        const user = yield db_1.Usermodel.findOne({
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
    }
    catch (error) {
        console.error("Share link error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})));
app.listen(config_1.PORT, () => {
    console.log(`Server is running on port ${config_1.PORT}`);
});
