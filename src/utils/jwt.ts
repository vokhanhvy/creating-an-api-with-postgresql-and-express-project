import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

export const generateToken = (user: { id: number; username: string }) => {
  return jwt.sign(user, secret);
};

export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing!" });
  } else {
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token!" });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};
