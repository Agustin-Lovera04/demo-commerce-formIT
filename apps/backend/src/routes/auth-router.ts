import { Router } from "express";
import { AuthController } from "../controller/auth-controller";

export const router = Router();


router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.get('/logout', AuthController.logout)

router.get("/current", AuthController.current);

export default router;