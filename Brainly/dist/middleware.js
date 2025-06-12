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
exports.usermiddleware = void 0;
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usermiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers["authorization"];
<<<<<<< HEAD
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized User" });
    }
    const token = header.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
=======
    const decoded = jsonwebtoken_1.default.verify(header, config_1.JWT_SECRET);
    if (decoded) {
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
        // @ts-ignore
        req.userId = decoded.id;
        next();
    }
<<<<<<< HEAD
    catch (error) {
        return res.status(401).json({ message: "Unauthorized User" });
=======
    else {
        res.status(401).json({ message: "Unauthorized User" });
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
    }
});
exports.usermiddleware = usermiddleware;
