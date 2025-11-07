import { Request, Response } from "express";
import { registerUser, loginUser } from "../../../../domain/dist/index.js";
import { AuthenticationService } from "../infraestructure/services/authentication/authentication-service.js"
import { CartServiceReal } from "../infraestructure/services/carts/cart-service.js"
import { ConfigServiceImpl } from "../infraestructure/services/config/config-service.js";
import { SecurityPasswordImpl } from "../infraestructure/services/security-password/security-password-service.js";

const securityPassword = new SecurityPasswordImpl()
const authService = new AuthenticationService(securityPassword);
const cartService = new CartServiceReal()
const configService = new ConfigServiceImpl()

export class AuthController {

  static async register(req: Request, res: Response) {
    try {
      const result = await registerUser({
        dependencies: { authenticationService: authService, cartService },
        payload: req.body,
      });

      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      return res.status(201).json({ user: result.data });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const result = await loginUser({
        dependencies: { authenticationService: authService, configService },
        payload: req.body,
      });
      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      if (!result.data) {
        return res.status(404).json({ error: 'Internal server error' });
      }

      res.cookie("token", result.data, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
      });

      return res.status(200).json(result.data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict',
      });

      return res.status(200).json({ ok: 'Session closed' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async current(req: Request, res: Response) {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: "No token" });

      const user = await authService.verifyToken(token, configService);
      if (!user) return res.status(401).json({ error: "Invalid token" });

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}