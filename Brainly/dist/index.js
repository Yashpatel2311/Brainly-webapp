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
<<<<<<< HEAD
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const app = (0, express_1.default)();
// Configure rate limiting
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts
    message: "Too many login attempts, please try again after 15 minutes",
});
=======
const app = (0, express_1.default)();
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
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
<<<<<<< HEAD
app.post("/api/v1/signup", authLimiter, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({
                message: "Username, email and password are required",
=======
app.post("/api/v1/signup", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({
                message: "Username and password are required",
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
                success: false,
            });
            return;
        }
<<<<<<< HEAD
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({
                message: "Invalid email format",
                success: false,
            });
            return;
        }
        const existingUser = yield db_1.Usermodel.findOne({
            $or: [{ username }, { email }],
        });
        if (existingUser) {
            res.status(400).json({
                message: "Username or email already exists",
=======
        const existingUser = yield db_1.Usermodel.findOne({ username });
        if (existingUser) {
            res.status(400).json({
                message: "Username already exists",
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
                success: false,
            });
            return;
        }
        const newUser = yield db_1.Usermodel.create({
            username,
<<<<<<< HEAD
            email,
            password,
        });
        const token = jsonwebtoken_1.default.sign({
            id: newUser._id,
        }, config_1.JWT_SECRET, { expiresIn: "7d" } // Increased token expiry to 7 days
        );
=======
            password,
        });
        // Generate token for immediate sign in after signup
        const token = jsonwebtoken_1.default.sign({
            id: newUser._id,
        }, config_1.JWT_SECRET, { expiresIn: "24h" });
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
        res.status(200).json({
            message: "User signed up successfully!",
            success: true,
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
<<<<<<< HEAD
                email: newUser.email,
=======
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
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
<<<<<<< HEAD
app.post("/api/v1/signin", authLimiter, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
=======
app.post("/api/v1/signin", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        console.log("Signin attempt for username:", username);
        // Validate input
        if (!username || !password) {
            console.log("Missing username or password");
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
            return res.status(400).json({
                message: "Username and password are required",
                success: false,
            });
        }
<<<<<<< HEAD
        const existingUser = yield db_1.Usermodel.findOne({ username });
        if (!existingUser) {
=======
        // Find user
        const existingUser = yield db_1.Usermodel.findOne({ username });
        console.log("User found:", existingUser ? "Yes" : "No");
        if (!existingUser) {
            console.log("User not found");
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
            return res.status(401).json({
                message: "Invalid username or password",
                success: false,
            });
        }
<<<<<<< HEAD
        const isPasswordValid = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordValid) {
=======
        // Check password
        const isPasswordValid = existingUser.password === password;
        console.log("Password valid:", isPasswordValid);
        if (!isPasswordValid) {
            console.log("Invalid password");
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
            return res.status(401).json({
                message: "Invalid username or password",
                success: false,
            });
        }
<<<<<<< HEAD
        // Update last login
        existingUser.lastLogin = new Date();
        yield existingUser.save();
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id,
        }, config_1.JWT_SECRET, { expiresIn: "7d" } // Increased token expiry to 7 days
        );
=======
        // Generate token
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id,
        }, config_1.JWT_SECRET, { expiresIn: "24h" });
        console.log("Signin successful, token generated");
        // Send response
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
        res.status(200).json({
            message: "Sign in successful!",
            success: true,
            token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
<<<<<<< HEAD
                email: existingUser.email,
=======
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
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
<<<<<<< HEAD
        const { _id } = req.body;
=======
        const { contentId } = req.body;
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
        if (!req.userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
<<<<<<< HEAD
        if (!_id) {
            res.status(400).json({ message: "Content ID is required" });
            return;
        }
        const result = yield db_1.Contentmodel.deleteOne({
            _id: new mongoose_1.default.Types.ObjectId(_id),
            userId: new mongoose_1.default.Types.ObjectId(req.userId),
        });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Content not found or unauthorized" });
            return;
        }
        res.json({
            message: "Content deleted successfully",
            success: true,
=======
        yield db_1.Contentmodel.deleteMany({
            contentId,
            userId: req.userId,
        });
        res.json({
            message: "deleted",
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
        });
    }
    catch (error) {
        console.error("Content deletion error:", error);
<<<<<<< HEAD
        if (error instanceof mongoose_1.default.Error.CastError) {
            res.status(400).json({ message: "Invalid content ID" });
        }
        else {
            res.status(500).json({ message: "Internal server error" });
        }
=======
        res.status(500).json({ message: "Internal server error" });
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
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
