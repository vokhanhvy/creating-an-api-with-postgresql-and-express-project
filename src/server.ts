import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import orderProductRoutes from "./handlers/orderProducts";
import userRoutes from "./handlers/user";
import productRoutes from "./handlers/product";
import orderRoutes from "./handlers/order";
import orderItemRoutes from "./handlers/orderItem";
import orderProductsItemRoutes from "./handlers/orderProducts";
const app: express.Application = express();
const address: string = "0.0.0.0:3000";
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});
app.use("/orderProduct", orderProductRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/order-items", orderItemRoutes);
app.use("/order-products", orderProductsItemRoutes);
app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
