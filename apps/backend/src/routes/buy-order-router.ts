import { Router } from "express";
import { BuyOrderController } from "../controller/buy-order-controller";
import { accessControl } from "../middleware/accessControl";
import { jwtValidate } from "../middleware/jwtValidate";
export const router = Router()

router.get('/getOrder/:id',  jwtValidate, accessControl(['CLIENT']), BuyOrderController.getOrder)
router.post('/genOrder',  jwtValidate, accessControl(['CLIENT']), BuyOrderController.genOrder)

export default router;