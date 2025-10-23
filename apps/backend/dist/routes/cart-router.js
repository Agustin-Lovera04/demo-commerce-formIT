"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const cart_service_1 = require("../infraestructure/services/carts/cart-service");
const dist_1 = require("../../../../domain/dist");
const jwtValidate_1 = require("../middleware/jwtValidate");
const accessControl_1 = require("../middleware/accessControl");
const products_service_1 = require("../infraestructure/services/products/products-service");
exports.router = (0, express_1.Router)();
const cartService = new cart_service_1.CartServiceReal();
const productService = new products_service_1.ProductsServiceReal();
exports.router.get("/getAllCarts/", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['CLIENT', 'ADMIN']), async (req, res) => {
    const carts = await (0, dist_1.getCarts)({ dependencies: cartService });
    if (!carts.success)
        return res.status(500).json({ error: carts.error });
    return res.status(200).json({ carts: carts.data });
});
exports.router.get("/getCart/:id", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['CLIENT', 'ADMIN']), async (req, res) => {
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
});
exports.router.post("/", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['PUBLIC']), async (req, res) => {
    const newCart = await (0, dist_1.createCart)({
        dependencies: cartService
    });
    if (!newCart.success)
        return res.status(500).json({ error: newCart.error });
    res.status(201).json(newCart.data);
});
exports.router.delete("/:id", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['ADMIN']), async (req, res) => {
    if (!req.params.id) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).json({ error: 'Missing id' });
    }
    const deleted = await (0, dist_1.deleteCart)({ dependencies: cartService, payload: { id: req.params.id } });
    if (!deleted.success)
        return res.status(400).json({ error: deleted.error });
    return res.status(200).json({ ok: deleted.data });
});
exports.router.post("/addProduct/:pid", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['CLIENT']), async (req, res) => {
    const { cartId } = req.user;
    if (!cartId || !req.params.pid) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).json({ error: 'Missing cid or pid' });
    }
    const added = await (0, dist_1.addProductToCart)({ dependencies: { cartService, productService }, payload: { cid: cartId, pid: req.params.pid } });
    if (!added.success)
        return res.status(400).json({ error: added.error });
    return res.status(200).json({ ok: 'Product added to cart' });
});
exports.router.delete("/:cid/product/:pid", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['CLIENT']), async (req, res) => {
    const { cartId } = req.user;
    if (cartId || !req.params.pid) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).json({ error: 'Missing cid or pid' });
    }
    const deleted = await (0, dist_1.deleteProductInCart)({ dependencies: { cartService, productService }, payload: { cid: cartId, pid: req.params.pid } });
    if (!deleted.success)
        return res.status(400).json({ error: deleted.error });
    res.json(deleted.data);
});
exports.default = exports.router;
//# sourceMappingURL=cart-router.js.map