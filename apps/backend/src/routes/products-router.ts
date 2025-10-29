import { Router } from 'express'
import { accessControl } from "../middleware/accessControl";
import { jwtValidate } from "../middleware/jwtValidate";
import { ProductsController } from 'src/controller/products-controller';

export const router = Router();

router.get("/getAllProducts", jwtValidate, accessControl(['CLIENT', 'ADMIN']), ProductsController.getAllProducts);

router.get("/getProduct/:id", jwtValidate, accessControl(['CLIENT', 'ADMIN']), ProductsController.getProductById);

router.post("/createProduct", jwtValidate, accessControl(['ADMIN']), ProductsController.createProduct);

router.put("/editProduct/:id", jwtValidate, accessControl(['ADMIN']), ProductsController.editProduct);

router.delete("/deleteProduct/:id", jwtValidate, accessControl(['ADMIN']), ProductsController.deleteProduct);

export default router;