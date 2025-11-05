import { Router} from 'express'
import { jwtValidate } from "../middleware/jwtValidate";
import { accessControl } from "../middleware/accessControl";
import { CartController } from '../controller/cart-controller';

export const router = Router();


router.get("/getAllCarts", jwtValidate, accessControl(['CLIENT', 'ADMIN']), CartController.getAllCarts);

router.get("/getCart/:id", jwtValidate, accessControl(['CLIENT', 'ADMIN']), CartController.getCartById);

router.post("/", jwtValidate, accessControl(['PUBLIC']), CartController.createCart);

router.delete("/:id", jwtValidate, accessControl(['ADMIN']), CartController.deleteCart);

router.post("/addProduct/:pid", jwtValidate, accessControl(['CLIENT']), CartController.addProductToCart);

router.delete("/deleteProduct/:pid", jwtValidate, accessControl(['CLIENT']), CartController.deleteProductInCart);

export default router;
