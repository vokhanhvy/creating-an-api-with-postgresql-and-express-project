// spec/handlers/orderProductSpec.ts

import supertest from "supertest";
import app from "../../server"; // Adjust the path as needed
import { UserModel } from "../../models/user";
import { ProductModel } from "../../models/product";
import { OrderModel } from "../../models/order";
import { OrderProductModel } from "../../models/orderProduct";

const request = supertest(app);
const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();
const orderProductModel = new OrderProductModel();

describe("OrderProduct Handlers", () => {
  let token: string;
  let userId: number;
  let orderId: number;
  let productId: number;
  let orderProductId: number;

  beforeAll(async () => {
    // Create a user for testing
    const user = await userModel.create({
      username: "b",
      password: "b",
      email: "b@gmail.com",
      id: 10,
    });
    userId = user.id as number;

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
    productId = product.id as number;

    // Create an order for testing
    const order = await orderModel.create({
      userId: user.id as number,
      id: 6,
      total: 500,
    });
    orderId = order.id as number;
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
