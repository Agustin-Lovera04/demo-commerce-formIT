import { Router, Request, Response } from "express";
import { CartServiceReal } from "../infraestructure/services/carts/cart-service";
import { createCart, deleteCart, getCartById, getCarts } from "../../../../domain/dist";

export const router = Router();
const cartService = new CartServiceReal();

router.get("/getAllCarts/", async (req: Request, res: Response) => {
    const carts = await getCarts(
        { dependencies: cartService });

    if (!carts.success) return res.status(500).json({ error: carts.error });
    return res.status(200).json({ carts: carts.data });
});

router.get("/getCart/:id", async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).json({ error: 'Missing id' });
    }
    const cart = await getCartById({
        dependencies: cartService,
        payload: { id: req.params.id }
    })
    if (!cart.success) return res.status(404).json({ error: cart.error });
    return res.status(200).json({ cart: cart.data });
});

router.post("/", async (req: Request, res: Response) => {
    const newCart = await createCart({
        dependencies: cartService
    })
    if (!newCart.success) return res.status(500).json({ error: newCart.error });
    res.status(201).json(newCart.data);
});

router.delete("/:id", async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).json({ error: 'Missing id' });
    }
    const deleted = await deleteCart({ dependencies: cartService, payload: { id: req.params.id } });
    if (!deleted.success) return res.status(400).json({ error: deleted.error });
    return res.status(200).json({ok:deleted.data});
});

router.post("/:cid/product/:pid", async (req: Request, res: Response) => {
    if (!req.params.cid || !req.params.pid) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).json({ error: 'Missing cid or pid' });
    }
    const added = await cartService.addProductToCart(req.params.cid, req.params.pid);
    if (!added.success) return res.status(400).json({ error: added.error });
    res.json(added.data);
});

router.delete("/:cid/product/:pid", async (req: Request, res: Response) => {
    if (!req.params.cid || !req.params.pid) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).json({ error: 'Missing cid or pid' });
    }
    const deleted = await cartService.deleteProductInCart(req.params.cid, req.params.pid);
    if (!deleted.success) return res.status(400).json({ error: deleted.error });
    res.json(deleted.data);
});

export default router;
