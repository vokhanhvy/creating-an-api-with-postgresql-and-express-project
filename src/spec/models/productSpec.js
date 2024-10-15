"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const productModel = new product_1.ProductModel();
describe("ProductModel", () => {
    it("should have index method", () => {
        expect(productModel.index).toBeDefined();
    });
    it("should have show method", () => {
        expect(productModel.show).toBeDefined();
    });
    it("should have create method", () => {
        expect(productModel.create).toBeDefined();
    });
    it("should have update method", () => {
        expect(productModel.update).toBeDefined();
    });
    it("should have delete method", () => {
        expect(productModel.delete).toBeDefined();
    });
});
