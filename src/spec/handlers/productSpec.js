"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
require("jasmine-expect");
const request = (0, supertest_1.default)(server_1.default);
describe("Products Endpoint", () => {
    let productId;
    it("create new product", async () => {
        const newProduct = {
            name: "Test",
            price: 19.99,
            description: "test",
        };
        const res = await request.post("/products").send(newProduct);
        expect(res.status).toBe(200);
        expect(res.body.id).toBeDefined();
        productId = res.body.id;
    });
    it("fetch the product", async () => {
        const res = await request.get(`/products/${productId}`);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Test");
    });
    it("update the product", async () => {
        const updatedProduct = {
            id: productId,
            name: "Updated Product Name",
            price: 29.99,
            description: "Updated description of the product.",
        };
        const res = await request
            .put(`/products/${productId}`)
            .send(updatedProduct);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Updated Product Name");
    });
    it("delete the created product", async () => {
        const res = await request.delete(`/products/${productId}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("delete successfully");
    });
});
