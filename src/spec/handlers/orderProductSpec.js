"use strict";
// spec/handlers/orderProductSpec.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server")); // Adjust the path as needed
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const order_1 = require("../../models/order");
const orderProduct_1 = require("../../models/orderProduct");
const request = (0, supertest_1.default)(server_1.default);
const userModel = new user_1.UserModel();
const productModel = new product_1.ProductModel();
const orderModel = new order_1.OrderModel();
const orderProductModel = new orderProduct_1.OrderProductModel();
describe("OrderProduct Handlers", () => {
    let token;
    let userId;
    let orderId;
    let productId;
    let orderProductId;
    beforeAll(async () => {
        // Create a user for testing
        const user = await userModel.create({
            username: "b",
            password: "b",
            email: "b@gmail.com",
            id: 10,
        });
        userId = user.id;
        // Assume you have a login route that returns a token
        const res = await request.post("/login").send({
            username: "testuser",
            password: "testpassword",
        });
        token = res.body.token;
        // Create a product for testing
        const product = await productModel.create({
            name: "Test Product",
            price: 100,
            id: 5,
        });
        productId = product.id;
        // Create an order for testing
        const order = await orderModel.create({
            userId: user.id,
            id: 6,
            total: 500,
        });
        orderId = order.id;
    });
    afterAll(async () => {
        // Clean up
        await orderProductModel.delete(orderProductId);
        await orderModel.delete(orderId);
        await productModel.delete(productId);
        await userModel.delete(userId);
    });
    it("should create an order product", async () => {
        const res = await request
            .post("/order-products")
            .send({
            orderId: orderId,
            productId: productId,
            quantity: 2,
        })
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.orderId).toBe(orderId);
        expect(res.body.productId).toBe(productId);
        orderProductId = res.body.id;
    });
    it("should retrieve an order product", async () => {
        const res = await request
            .get(`/order-products/${orderProductId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(orderProductId);
    });
    it("should update an order product", async () => {
        const res = await request
            .put(`/order-products/${orderProductId}`)
            .send({
            orderId: orderId,
            productId: productId,
            quantity: 5,
        })
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.quantity).toBe(5);
    });
    it("should delete an order product", async () => {
        const res = await request
            .delete(`/order-products/${orderProductId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
