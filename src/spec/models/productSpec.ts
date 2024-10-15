import { ProductModel } from "../../models/product";

const productModel = new ProductModel();

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
