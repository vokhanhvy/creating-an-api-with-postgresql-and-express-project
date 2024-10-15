import express, { Request, Response } from "express";
import { OrderProductModel } from "../models/orderProduct";
import { verifyToken } from "../utils/jwt";

const orderProductRouter = express.Router();
const orderProductModel = new OrderProductModel();

orderProductRouter.post(
  "/:id/products",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const order_id = parseInt(req.params.id);
      const { product_id, quantity } = req.body;

      if (isNaN(order_id) || isNaN(product_id) || isNaN(quantity)) {
        return res.status(400).json({ error: "Invalid input" });
      }

      const addedProduct = await orderProductModel.addProduct({
        order_id,
        product_id,
        quantity,
      });

      res.status(201).json(addedProduct);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

orderProductRouter.get(
  "/:id/products",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const order_id = parseInt(req.params.id);

      if (isNaN(order_id)) {
        return res.status(400).json({ error: "Invalid order ID" });
      }

      const products = await orderProductModel.getProductsByOrder(order_id);

      if (products.length > 0) {
        res.status(200).json(products);
      } else {
        res.status(404).json({ message: "No products found for this order" });
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

orderProductRouter.put(
  "/:id/products/:product_id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const order_id = parseInt(req.params.id);
      const product_id = parseInt(req.params.product_id);
      const { quantity } = req.body;

      if (isNaN(order_id) || isNaN(product_id) || isNaN(quantity)) {
        return res.status(400).json({ error: "Invalid input" });
      }

      const updatedProduct = await orderProductModel.updateProduct({
        order_id,
        product_id,
        quantity,
      });

      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ message: "Product not found in order" });
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

// Delete Product from Order
orderProductRouter.delete(
  "/:id/products/:product_id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const product_id = parseInt(req.params.product_id);

      if (isNaN(id) || isNaN(product_id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const deletedProduct = await orderProductModel.delete(id);

      if (deletedProduct) {
        res.status(200).json(deletedProduct); // Return 200 with deleted product
      } else {
        res.status(404).json({ message: "Product not found in order" });
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

export default orderProductRouter;
