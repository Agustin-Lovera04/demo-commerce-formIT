import { Router, Request, Response } from "express";
import { BuyOrderServiceReal } from "../infraestructure/services/buy-order/buy-order-service";
import { genBuyOrder } from "../../../../domain/dist";
import { CartServiceReal } from "../infraestructure/services/carts/cart-service";
import { accessControl } from "../middleware/accessControl";
import { jwtValidate } from "../middleware/jwtValidate";
export const router = Router();
const buyOrderService = new BuyOrderServiceReal();
const cartService = new CartServiceReal()

router.post('/genOrder',  jwtValidate, accessControl(['CLIENT']),async(req: Request, res: Response)=>{
    try {
       const { cartId } = (req as any).user;

    if (!cartId) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).json({ error: 'Missing cartId' });
    }
        const genOrder = await genBuyOrder({
            dependencies: {buyOrderService, cartService},
            payload: {id: cartId}
        })
        if(!genOrder.success){
            return res.status(404).json({error: genOrder.error});
        }

        return res.status(200).json({ok: genOrder.data});
    } catch (error) {
        return res.status(500).json({error: 'Internal service error'});
    }
})

export default router;