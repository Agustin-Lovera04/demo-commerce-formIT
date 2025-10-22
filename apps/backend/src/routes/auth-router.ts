import { Router, Request, Response } from "express";
import { registerUser, loginUser } from "../../../../domain/dist/index.js";
import { AuthenticationService } from "../infraestructure/services/authentication/authentication-service.js"
export const router = Router();
const authService = new AuthenticationService();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const result = await registerUser({
      dependencies: { authenticationService: authService },
      payload: req.body,
    });
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({ user: result.data });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const result = await loginUser({
      dependencies: { authenticationService: authService },
      payload: req.body,
    });

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    if( !result.data) {
      return res.status(404).json({error: 'Internal server error'});
    }
    return res.status(200).json(result.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;