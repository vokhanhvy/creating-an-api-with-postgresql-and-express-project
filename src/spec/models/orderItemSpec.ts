import { OrderItemModel, OrderItem } from "../../models/orderItem";

const orderItemModel = new OrderItemModel();

describe("OrderItem Model", () => {
  it("should have index method", () => {
    expect(orderItemModel.index).toBeDefined();
  });

  it("should have show method", () => {
    expect(orderItemModel.show).toBeDefined();
  });

  it("should have create method", () => {
    expect(orderItemModel.create).toBeDefined();
  });

  it("should have update method", () => {
    expect(orderItemModel.update).toBeDefined();
  });

  it("should have delete method", () => {
    expect(orderItemModel.delete).toBeDefined();
  });
});
