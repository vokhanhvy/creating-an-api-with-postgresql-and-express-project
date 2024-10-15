"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign(user, secret);
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "Access denied, token missing!" });
    }
    else {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token!" });
            }
            else {
                req.user = decoded;
                next();
            }
        });
    }
};
exports.verifyToken = verifyToken;
