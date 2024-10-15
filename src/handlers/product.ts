import express, { Request, Response } from "express";
import { ProductModel, Product } from "../models/product";
import { verifyToken } from "../utils/jwt";
const productRouter = express.Router();
const productModel = new ProductModel();

productRouter.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const products = await productModel.index();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
});

productRouter.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const product = await productModel.show(parseInt(req.params.id));
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
});

productRouter.post("/", async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: 0,
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await productModel.create(product);
    res.json(newProduct);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
});

productRouter.put("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: parseInt(req.params.id),
      name: req.body.name,
      price: req.body.price,
    };
    const updatedProduct = await productModel.update(product);
    res.json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
});

productRouter.delete(
  "/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const product = await productModel.delete(parseInt(req.params.id));
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

export default productRouter;
