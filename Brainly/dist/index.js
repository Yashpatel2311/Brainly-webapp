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
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://theyashpatel2311:Yash.2311@cluster0.taqoa.mongodb.net/brainly-database");
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    yield db_1.Usermodel.create({
        username: username,
        password: password,
    });
    res.status(200).json({
        message: "user signed up!",
    });
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.Usermodel.findOne({
        username,
        password,
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id,
        }, config_1.JWT_SECRET);
        res.json({ token });
    }
    else {
        res.status(403).json({ message: "user is not sign up!" });
    }
}));
app.post("/api/v1/content", middleware_1.usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    // Create a new content entry linked to the logged-in user.
    yield db_1.Contentmodel.create({
        link,
        type,
        title,
        //@ts-ignore
        userId: req.userId, // userId is added by the middleware.
        tags: [], // Initialize tags as an empty array.
    });
    res.json({ message: "Content added" }); // Send success response.
}));
app.get("/api/v1/content", middleware_1.usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId; // User ID is fetched from middleware
    // Fetch all content associated with the user ID and populate username
    // The `populate` function is used to include additional details from the referenced `userId`.
    // For example, it will fetch the username linked to the userId.
    // Since we specified "username", only the username will be included in the result,
    // and other details like password won’t be fetched.
    const content = yield db_1.Contentmodel.find({ userId: userId }).populate("userId", "username");
    res.json({ content }); // Send the content as response
}));
app.delete("/api/v1/content", middleware_1.usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.Contentmodel.deleteMany({
        contentId: contentId,
        //@ts-ignore
        userId: req.userId,
    });
    res.json({
        message: "deleted",
    });
}));
app.post("/api/v1/brain/share", middleware_1.usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existinglink = yield db_1.Linkmodel.findOne({
            //@ts-ignore
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
            //@ts-ignore
            userId: req.userId,
            hash: hash,
        });
        res.json({
            hash,
        });
    }
    else {
        yield db_1.Linkmodel.deleteOne({
            //@ts-ignore
            userId: req.userId,
        });
        res.json({
            message: "Removed Link",
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    //userId
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
}));
app.listen(3000);
