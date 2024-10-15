"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const orderModel = new order_1.OrderModel();
describe("Order Model", () => {
    it("should have index method", () => {
        expect(orderModel.index).toBeDefined();
    });
    it("should have show method", () => {
        expect(orderModel.show).toBeDefined();
    });
    it("should have create method", () => {
        expect(orderModel.create).toBeDefined();
    });
    it("should have update method", () => {
        expect(orderModel.update).toBeDefined();
    });
    it("should have delete method", () => {
        expect(orderModel.delete).toBeDefined();
    });
});
