"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const jwt_1 = require("../utils/jwt");
const userRouter = express_1.default.Router();
const userModel = new user_1.UserModel();
userRouter.get("/", jwt_1.verifyToken, async (req, res) => {
    try {
        const users = await userModel.index();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
userRouter.get("/:id", jwt_1.verifyToken, async (req, res) => {
    try {
        const user = await userModel.show(parseInt(req.params.id));
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
userRouter.post("/", async (req, res) => {
    try {
        const user = {
            id: 0,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        };
        const newUser = await userModel.create(user);
        res.json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
userRouter.put("/:id", jwt_1.verifyToken, async (req, res) => {
    try {
        const user = {
            id: parseInt(req.params.id),
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        };
        const updatedUser = await userModel.update(user);
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
userRouter.delete("/:id", jwt_1.verifyToken, async (req, res) => {
    try {
        const user = await userModel.delete(parseInt(req.params.id));
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = userRouter;
