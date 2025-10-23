import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../../../domain/dist";

const JWT_SECRET = config.SECRET_KEY_JWT;

export const jwtValidate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: "You must log in." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;

    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Session expired - Please log in again." });
    }

    return res.status(401).json({ error: "Invalid or unauthorized token." });
  }
};
