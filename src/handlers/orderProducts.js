"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderProduct_1 = require("../models/orderProduct");
const jwt_1 = require("../utils/jwt");
const orderProductRoutes = (app) => {
    app.post("/orders/:id/products", jwt_1.verifyToken, addProduct);
    app.get("/orders/:id/products", jwt_1.verifyToken, getProductsByOrder);
};
const orderProductModel = new orderProduct_1.OrderProductModel();
// Add Product to Order
const addProduct = async (req, res) => {
    try {
        const order_id = parseInt(req.params.id);
        const { product_id, quantity } = req.body;
        const addedProduct = await orderProductModel.addProduct({
            order_id,
            product_id,
            quantity,
        });
        res.json(addedProduct);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get Products by Order ID
const getProductsByOrder = async (req, res) => {
    try {
        const order_id = parseInt(req.params.id);
        const products = await orderProductModel.getProductsByOrder(order_id);
        res.json(products);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.default = orderProductRoutes;
