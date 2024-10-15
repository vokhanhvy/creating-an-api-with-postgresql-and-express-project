// spec/models/orderProductSpec.ts

import { OrderProductModel, OrderProduct } from "../../models/orderProduct";
import { UserModel } from "../../models/user";
import { ProductModel } from "../../models/product";
import { OrderModel } from "../../models/order";

const orderProductModel = new OrderProductModel();
const orderModel = new OrderModel();
const productModel = new ProductModel();
const userModel = new UserModel();

describe("OrderProductModel", () => {
  let orderId: number;
  let productId: number;

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
      userId: user.id as number,
      id: 6,
      total: 500,
    });

    orderId = order.id as number;
    productId = product.id as number;
  });

  it("should have an addProduct method", () => {
    expect(orderProductModel.addProduct).toBeDefined();
  });

  it("should have a getProductsByOrder method", () => {
    expect(orderProductModel.getProductsByOrder).toBeDefined();
  });

  it("addProduct method should add a product to an order", async () => {
    const orderProduct: OrderProduct = {
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
