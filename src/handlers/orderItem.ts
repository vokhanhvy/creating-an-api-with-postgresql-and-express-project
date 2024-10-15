import express, { Request, Response } from "express";
import { OrderItemModel, OrderItem } from "../models/orderItem";
import { verifyToken } from "../utils/jwt";
const orderItemRouter = express.Router();
const orderItemModel = new OrderItemModel();

orderItemRouter.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const orderItems = await orderItemModel.index();
    res.json(orderItems);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
});

orderItemRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const orderItem = await orderItemModel.show(parseInt(req.params.id));
    if (orderItem) {
      res.json(orderItem);
    } else {
      res.status(404).json({ message: "Order item not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
});

orderItemRouter.post("/", async (req: Request, res: Response) => {
  try {
    const orderItem: OrderItem = {
      id: 0,
      orderId: req.body.order_id,
      productId: req.body.product_id,
      quantity: req.body.quantity,
    };
    const newOrderItem = await orderItemModel.create(orderItem);
    res.status(201).json(newOrderItem);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
});

orderItemRouter.put(
  "/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const orderItem: OrderItem = {
        id: parseInt(req.params.id),
        orderId: req.body.order_id,
        productId: req.body.product_id,
        quantity: req.body.quantity,
      };
      const updatedOrderItem = await orderItemModel.update(orderItem);
      res.json(updatedOrderItem);
    } catch (error: any) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

orderItemRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedOrderItem = await orderItemModel.delete(
      parseInt(req.params.id)
    );
    if (deletedOrderItem) {
      res.status(200).json({ message: "deleted successfully" });
    } else {
      res.status(404).json({ message: "Order item not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default orderItemRouter;
