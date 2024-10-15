"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
require("jasmine-expect");
const request = (0, supertest_1.default)(server_1.default);
describe("Order Endpoint", () => {
    let orderId;
    it("create new order", async () => {
        const newOrder = {
            user_id: 1,
            total: 100,
        };
        const res = await request.post("/orders").send(newOrder);
        expect(res.status).toBe(200);
        expect(res.body.id).toBeDefined();
        orderId = res.body.id;
    });
    it("fetch the order", async () => {
        const res = await request.get(`/orders/${orderId}`);
        expect(res.status).toBe(200);
        expect(res.body.total).toBe(50.75);
    });
    it("update the order", async () => {
        const updatedOrder = {
            id: orderId,
            user_id: 1,
            total: 75.25,
        };
        const res = await request.put(`/orders/${orderId}`).send(updatedOrder);
        expect(res.status).toBe(200);
        expect(res.body.total).toBe(75.25);
    });
    it("delete the order", async () => {
        const res = await request.delete(`/orders/${orderId}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("delete successfully");
    });
});
