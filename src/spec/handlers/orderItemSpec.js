"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
require("jasmine-expect");
const request = (0, supertest_1.default)(server_1.default);
describe("Order Item Endpoint", () => {
    let orderItemId;
    it("create a new order", async () => {
        const newOrderItem = {
            order_id: 1,
            product_id: 1,
            quantity: 1,
        };
        const res = await request.post("/order-items").send(newOrderItem);
        expect(res.status).toBe(200);
        expect(res.body.id).toBeDefined();
        orderItemId = res.body.id;
    });
    it("fetch the order", async () => {
        const res = await request.get(`/order-items/${orderItemId}`);
        expect(res.status).toBe(200);
        expect(res.body.quantity).toBe(2);
    });
    it("update the order ", async () => {
        const updatedOrderItem = {
            id: orderItemId,
            order_id: 1,
            product_id: 1,
            quantity: 5,
        };
        const res = await request
            .put(`/order-items/${orderItemId}`)
            .send(updatedOrderItem);
        expect(res.status).toBe(200);
        expect(res.body.quantity).toBe(3);
    });
    it("delete the order ", async () => {
        const res = await request.delete(`/order-items/${orderItemId}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("deleted successfully");
    });
});
