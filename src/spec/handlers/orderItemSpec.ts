import supertest from "supertest";
import app from "../../server";
import "jasmine-expect";

// const request = supertest(app);
// describe("Order Item Endpoint", () => {
//   let orderItemId: number;

//   it("create a new order", async () => {
//     const newOrderItem = {
//       order_id: 1,
//       product_id: 1,
//       quantity: 1,
//     };

//     const res = await request.post("/order-items").send(newOrderItem);
//     expect(res.status).toBe(200);
//     expect(res.body.id).toBeDefined();
//     orderItemId = res.body.id;
//   });

//   it("fetch the order", async () => {
//     const res = await request.get(`/order-items/${orderItemId}`);
//     expect(res.status).toBe(200);
//     expect(res.body.quantity).toBe(2);
//   });

//   it("update the order ", async () => {
//     const updatedOrderItem = {
//       id: orderItemId,
//       order_id: 1,
//       product_id: 1,
//       quantity: 5,
//     };

//     const res = await request
//       .put(`/order-items/${orderItemId}`)
//       .send(updatedOrderItem);
//     expect(res.status).toBe(200);
//     expect(res.body.quantity).toBe(3);
//   });

//   it("delete the order ", async () => {
//     const res = await request.delete(`/order-items/${orderItemId}`);
//     expect(res.status).toBe(200);
//     expect(res.body.message).toBe("deleted successfully");
//   });
// });
describe("Order Item Endpoints", () => {
  let orderItemId: number;
  let orderId: number;
  let productId: number;

  beforeAll(async () => {
    // Create a sample order and product
    const orderRes = await supertest(app).post("/orders").send({
      userId: 1, // Adjust based on your test data
      total: 100,
      createdAt: new Date(),
    });
    orderId = orderRes.body.id;

    const productRes = await supertest(app).post("/products").send({
      name: "Test Product",
      price: 10,
    });
    productId = productRes.body.id;
  });

  it("should create an order item", async () => {
    const res = await supertest(app).post("/order-items").send({
      order_id: orderId,
      product_id: productId,
      quantity: 2,
    });

    expect(res.status).toBe(200);
    expect(res.body.order_id).toBe(orderId);
    expect(res.body.product_id).toBe(productId);
    expect(res.body.quantity).toBe(2);

    orderItemId = res.body.id; // Store the ID for future tests
  });

  it("should fetch the created order item", async () => {
    const res = await supertest(app).get(`/order-items/${orderItemId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(orderItemId);
    expect(res.body.order_id).toBe(orderId);
    expect(res.body.product_id).toBe(productId);
    expect(res.body.quantity).toBe(2);
  });

  it("should return 404 for non-existent order item", async () => {
    const res = await supertest(app).get("/order-items/9999"); // Non-existent ID

    expect(res.status).toBe(404);
  });
});
