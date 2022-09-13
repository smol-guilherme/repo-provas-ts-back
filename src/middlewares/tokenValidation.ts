import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const J_SECRET: string = process.env.ENCRYPTION_SECRET!;

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token: string | undefined = authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).send();
  jwt.verify(token!, J_SECRET, (error, decoded) => {
    if (error !== null) throw { type: "authentication_error" };
    res.locals.id = decoded as { id: string };
  });
  next();
}
