"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../models/order");
const jwt_1 = require("../utils/jwt");
const orderRouter = express_1.default.Router();
const orderModel = new order_1.OrderModel();
orderRouter.get("/", jwt_1.verifyToken, async (req, res) => {
    try {
        const orders = await orderModel.index();
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
orderRouter.get("/:id", jwt_1.verifyToken, async (req, res) => {
    try {
        const order = await orderModel.show(parseInt(req.params.id));
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
orderRouter.post("/", async (req, res) => {
    try {
        const order = {
            id: 0, // Assuming you set this appropriately
            userId: req.body.user_id,
            total: req.body.total,
            createdAt: new Date(req.body.createdAt),
        };
        const newOrder = await orderModel.create(order);
        res.json(newOrder);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
orderRouter.put("/:id", jwt_1.verifyToken, async (req, res) => {
    try {
        const order = {
            id: parseInt(req.params.id),
            userId: req.body.user_id,
            total: req.body.total,
            createdAt: new Date(req.body.createdAt),
        };
        const updatedOrder = await orderModel.update(order);
        res.json(updatedOrder);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
orderRouter.delete("/:id", jwt_1.verifyToken, async (req, res) => {
    try {
        const order = await orderModel.delete(parseInt(req.params.id));
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = orderRouter;
