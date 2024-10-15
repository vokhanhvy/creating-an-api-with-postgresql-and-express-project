import express, { Request, Response } from "express";
import { UserModel, User } from "../models/user";
import { verifyToken } from "../utils/jwt";

const userRouter = express.Router();
const userModel = new UserModel();

userRouter.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const users = await userModel.index();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

userRouter.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await userModel.show(parseInt(req.params.id));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Create a new user
userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: 0,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };
    const newUser = await userModel.create(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Update an existing user by ID
userRouter.put("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: parseInt(req.params.id),
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };
    const updatedUser = await userModel.update(user);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

userRouter.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const deleted = await userModel.delete(parseInt(req.params.id));
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default userRouter;
