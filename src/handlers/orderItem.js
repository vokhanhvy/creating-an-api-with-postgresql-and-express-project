"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderItem_1 = require("../models/orderItem");
const jwt_1 = require("../utils/jwt");
const orderItemRouter = express_1.default.Router();
const orderItemModel = new orderItem_1.OrderItemModel();
orderItemRouter.get("/", jwt_1.verifyToken, async (req, res) => {
    try {
        const orderItems = await orderItemModel.index();
        res.json(orderItems);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
orderItemRouter.get("/:id", jwt_1.verifyToken, async (req, res) => {
    try {
        const orderItem = await orderItemModel.show(parseInt(req.params.id));
        res.json(orderItem);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
orderItemRouter.post("/", async (req, res) => {
    try {
        const orderItem = {
            id: 0,
            orderId: req.body.order_id,
            productId: req.body.product_id,
            quantity: req.body.quantity,
        };
        const newOrderItem = await orderItemModel.create(orderItem);
        res.json(newOrderItem);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
orderItemRouter.put("/:id", jwt_1.verifyToken, async (req, res) => {
    try {
        const orderItem = {
            id: parseInt(req.params.id),
            orderId: req.body.order_id,
            productId: req.body.product_id,
            quantity: req.body.quantity,
        };
        const updatedOrderItem = await orderItemModel.update(orderItem);
        res.json(updatedOrderItem);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
orderItemRouter.delete("/:id", jwt_1.verifyToken, async (req, res) => {
    try {
        const orderItem = await orderItemModel.delete(parseInt(req.params.id));
        res.json(orderItem);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = orderItemRouter;
