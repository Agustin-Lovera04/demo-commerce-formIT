import { Router, Request, Response } from "express";
import { ProductsServiceReal } from "../infraestructure/services/products/products-service";
import { createProduct, deleteProducts, editProducts, getAllProducts, getProductById } from "../../../../domain/dist";
import { accessControl } from "../middleware/accessControl";
import { jwtValidate } from "../middleware/jwtValidate";

export const router = Router();
const productsService = new ProductsServiceReal();

router.get("/getAllProducts", jwtValidate, accessControl(['CLIENT', 'ADMIN']),async (req: Request, res: Response) => {
  try {
    const result = await getAllProducts({
      dependencies: productsService,
    });
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({ products: result.data });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getProduct/:id", jwtValidate, accessControl(['CLIENT', 'ADMIN']),async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    if(!id){
      res.setHeader('Content-Type','application/json');
      return res.status(404).json({error: 'Missing id'});
    }
    const result = await getProductById({
      dependencies: productsService,
      payload: {id}
    });
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({ product: result.data });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/createProduct", jwtValidate, accessControl(['ADMIN']),async (req: Request, res: Response) => {
  try {
    const result = await createProduct({
      dependencies: productsService,
      payload: req.body
    });
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({ product: result.data });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/editProduct/:id", jwtValidate, accessControl(['ADMIN']),async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    if(!id){
      res.setHeader('Content-Type','application/json');
      return res.status(404).json({error: 'Missing id'});
    }
    const result = await editProducts({
      dependencies: productsService,
      payload: {id, ...req.body}
    });
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({ product: result.data });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/deleteProduct/:id", jwtValidate, accessControl(['ADMIN']),async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    if(!id){
      res.setHeader('Content-Type','application/json');
      return res.status(404).json({error: 'Missing id'});
    }
    const result = await deleteProducts({
      dependencies: productsService,
      payload: {id}
    });
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({ product: result.data });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;