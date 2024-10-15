"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../models/product");
const jwt_1 = require("../utils/jwt");
const productRouter = express_1.default.Router();
const productModel = new product_1.ProductModel();
productRouter.get("/", jwt_1.verifyToken, async (req, res) => {
    try {
        const products = await productModel.index();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
productRouter.get("/:id", jwt_1.verifyToken, async (req, res) => {
    try {
        const product = await productModel.show(parseInt(req.params.id));
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
productRouter.post("/", async (req, res) => {
    try {
        const product = {
            id: 0,
            name: req.body.name,
            price: req.body.price,
        };
        const newProduct = await productModel.create(product);
        res.json(newProduct);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
productRouter.put("/:id", jwt_1.verifyToken, async (req, res) => {
    try {
        const product = {
            id: parseInt(req.params.id),
            name: req.body.name,
            price: req.body.price,
        };
        const updatedProduct = await productModel.update(product);
        res.json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
productRouter.delete("/:id", jwt_1.verifyToken, async (req, res) => {
    try {
        const product = await productModel.delete(parseInt(req.params.id));
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = productRouter;
