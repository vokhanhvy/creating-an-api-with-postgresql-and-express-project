import express, { Request, Response } from "express";
import { OrderModel, Order } from "../models/order";
import { verifyToken } from "../utils/jwt";
const orderRouter = express.Router();
const orderModel = new OrderModel();

orderRouter.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.index();
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
});

orderRouter.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const order = await orderModel.show(parseInt(req.params.id));
    res.json(order);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
});

orderRouter.post("/", async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: 0, // Assuming you set this appropriately
      userId: req.body.user_id,
      total: req.body.total,
      createdAt: new Date(req.body.createdAt),
    };
    const newOrder = await orderModel.create(order);
    res.json(newOrder);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
});

orderRouter.put("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: parseInt(req.params.id),
      userId: req.body.user_id,
      total: req.body.total,
      createdAt: new Date(req.body.createdAt),
    };
    const updatedOrder = await orderModel.update(order);
    res.json(updatedOrder);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
});

orderRouter.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const order = await orderModel.delete(parseInt(req.params.id));
    res.json(order);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default orderRouter;
