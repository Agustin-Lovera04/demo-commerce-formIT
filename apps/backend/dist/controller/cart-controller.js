"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const cart_service_1 = require("../infraestructure/services/carts/cart-service");
const dist_1 = require("../../../../domain/dist");
const products_service_1 = require("../infraestructure/services/products/products-service");
const cartService = new cart_service_1.CartServiceReal();
const productService = new products_service_1.ProductsServiceReal();
class CartController {
    static async getAllCarts(req, res) {
        const carts = await (0, dist_1.getCarts)({ dependencies: cartService });
        if (!carts.success)
            return res.status(500).json({ error: carts.error });
        return res.status(200).json({ carts: carts.data });
    }
    static async getCartById(req, res) {
        if (!req.params.id) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: 'Missing id' });
        }
        const cart = await (0, dist_1.getCartById)({
            dependencies: cartService,
            payload: { id: req.params.id }
        });
        if (!cart.success)
            return res.status(404).json({ error: cart.error });
        return res.status(200).json({ cart: cart.data });
    }
    static async createCart(req, res) {
        const newCart = await (0, dist_1.createCart)({
            dependencies: cartService
        });
        if (!newCart.success)
            return res.status(500).json({ error: newCart.error });
        res.status(201).json(newCart.data);
    }
    static async deleteCart(req, res) {
        if (!req.params.id) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: 'Missing id' });
        }
        const deleted = await (0, dist_1.deleteCart)({ dependencies: cartService, payload: { id: req.params.id } });
        if (!deleted.success)
            return res.status(400).json({ error: deleted.error });
        return res.status(200).json({ ok: deleted.data });
    }
    static async addProductToCart(req, res) {
        const { cartId } = req.user;
        if (!cartId || !req.params.pid) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: 'Missing cid or pid' });
        }
        const added = await (0, dist_1.addProductToCart)({ dependencies: { cartService, productService }, payload: { cid: cartId, pid: req.params.pid } });
        if (!added.success)
            return res.status(400).json({ error: added.error });
        return res.status(200).json({ ok: 'Product added to cart' });
    }
    static async deleteProductInCart(req, res) {
        const { cartId } = req.user;
        if (!cartId || !req.params.pid) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: 'Missing cid or pid' });
        }
        const deleted = await (0, dist_1.deleteProductInCart)({ dependencies: { cartService, productService }, payload: { cid: cartId, pid: req.params.pid } });
        if (!deleted.success)
            return res.status(400).json({ error: deleted.error });
        return res.status(200).json({ ok: deleted.data });
    }
}
exports.CartController = CartController;
//# sourceMappingURL=cart-controller.js.map