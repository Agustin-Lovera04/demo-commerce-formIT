import { Request, Response, NextFunction } from "express";

export const accessControl = (access: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    access = access.map(permission => permission.toLowerCase());

    if (access.includes("public")) {
      return next();
    }

    const userRole = (req as any).user?.role?.toLowerCase();

    if (!userRole || !access.includes(userRole)) {
      res.setHeader("Content-Type", "application/json");
      return res
        .status(404)
        .json({ error: `Acceso denegado - '${(req as any).user?.role}' no puede realizar esta acción.` });
    }

    next();
  };
};
