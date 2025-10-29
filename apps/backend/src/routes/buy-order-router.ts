import { Router } from "express";
import { BuyOrderController } from "../controller/buy-order";
import { accessControl } from "../middleware/accessControl";
import { jwtValidate } from "../middleware/jwtValidate";
export const router = Router();

router.post('/genOrder',  jwtValidate, accessControl(['CLIENT']), BuyOrderController.genOrder)

export default router;