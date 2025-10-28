import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ConfigServiceImpl } from "../infraestructure/services/config/config-service.js";

const configService = new ConfigServiceImpl();

export const jwtValidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: "You must log in." });
    }

    const secretResult = await configService.getSecretKeyJWT();
    if (!secretResult.success || !secretResult.data) {
      return res.status(500).json({ error: "JWT secret not configured" });
    }

    const decoded = jwt.verify(token, secretResult.data);
    (req as any).user = decoded;

    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Session expired - Please log in again." });
    }

    return res.status(401).json({ error: "Invalid or unauthorized token." });
  }
};
