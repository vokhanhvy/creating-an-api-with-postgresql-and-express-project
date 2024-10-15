"use strict";
// spec/models/orderProductSpec.ts
Object.defineProperty(exports, "__esModule", { value: true });
const orderProduct_1 = require("../../models/orderProduct");
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const order_1 = require("../../models/order");
const orderProductModel = new orderProduct_1.OrderProductModel();
const orderModel = new order_1.OrderModel();
const productModel = new product_1.ProductModel();
const userModel = new user_1.UserModel();
describe("OrderProductModel", () => {
    let orderId;
    let productId;
    beforeAll(async () => {
        const user = await userModel.create({
            id: 1,
            username: "a",
            password: "a",
            email: "a@gmail.com",
        });
        const product = await productModel.create({
            name: "Test Product",
            price: 100,
            id: 5,
        });
        const order = await orderModel.create({
            userId: user.id,
            id: 6,
            total: 500,
        });
        orderId = order.id;
        productId = product.id;
    });
    it("should have an addProduct method", () => {
        expect(orderProductModel.addProduct).toBeDefined();
    });
    it("should have a getProductsByOrder method", () => {
        expect(orderProductModel.getProductsByOrder).toBeDefined();
    });
    it("addProduct method should add a product to an order", async () => {
        const orderProduct = {
            order_id: orderId,
            product_id: productId,
            quantity: 2,
        };
        const result = await orderProductModel.addProduct(orderProduct);
        expect(result).toEqual({
            id: result.id,
            order_id: orderId,
            product_id: productId,
            quantity: 2,
        });
    });
    it("getProductsByOrder method should return products for a given order", async () => {
        const result = await orderProductModel.getProductsByOrder(orderId);
        expect(result.length).toBeGreaterThan(0);
        expect(result[0]).toEqual({
            id: result[0].id,
            order_id: orderId,
            product_id: productId,
            quantity: 2,
        });
    });
});
