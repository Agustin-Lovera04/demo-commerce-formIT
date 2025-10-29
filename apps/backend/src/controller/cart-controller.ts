import { Request, Response } from "express";
import { CartServiceReal } from "../infraestructure/services/carts/cart-service";
import { addProductToCart, createCart, deleteCart, deleteProductInCart, getCartById, getCarts } from "../../../../domain/dist";
import { ProductsServiceReal } from "../infraestructure/services/products/products-service";

const cartService = new CartServiceReal();
const productService = new ProductsServiceReal();

export class CartController {
    static async getAllCarts(req: Request, res: Response) {
        const carts = await getCarts(
            { dependencies: cartService });

        if (!carts.success) return res.status(500).json({ error: carts.error });
        return res.status(200).json({ carts: carts.data });
    }

    static async getCartById(req: Request, res: Response) {
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
    }

    static async createCart(req: Request, res: Response) {
        const newCart = await createCart({
            dependencies: cartService
        })
        if (!newCart.success) return res.status(500).json({ error: newCart.error });
        res.status(201).json(newCart.data);
    }

    static async deleteCart(req: Request, res: Response) {
        if (!req.params.id) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: 'Missing id' });
        }
        const deleted = await deleteCart({ dependencies: cartService, payload: { id: req.params.id } });
        if (!deleted.success) return res.status(400).json({ error: deleted.error });
        return res.status(200).json({ ok: deleted.data });
    }

    static async addProductToCart(req: Request, res: Response) {
        const { cartId } = (req as any).user;

        if (!cartId || !req.params.pid) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: 'Missing cid or pid' });
        }
        const added = await addProductToCart({ dependencies: { cartService, productService }, payload: { cid: cartId, pid: req.params.pid } });

        if (!added.success) return res.status(400).json({ error: added.error });
        return res.status(200).json({ ok: 'Product added to cart' });
    }

    static async deleteProductInCart(req: Request, res: Response) {
        const { cartId } = (req as any).user;

        if (!cartId || !req.params.pid) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: 'Missing cid or pid' });
        }
        const deleted = await deleteProductInCart({ dependencies: { cartService, productService }, payload: { cid: cartId, pid: req.params.pid } });
        if (!deleted.success) return res.status(400).json({ error: deleted.error });
        return res.status(200).json({ ok: deleted.data });
    }
}