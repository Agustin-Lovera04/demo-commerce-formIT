"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const buy_order_service_1 = require("../infraestructure/services/buy-order/buy-order-service");
const dist_1 = require("../../../../domain/dist");
const cart_service_1 = require("../infraestructure/services/carts/cart-service");
const accessControl_1 = require("../middleware/accessControl");
const jwtValidate_1 = require("../middleware/jwtValidate");
exports.router = (0, express_1.Router)();
const buyOrderService = new buy_order_service_1.BuyOrderServiceReal();
const cartService = new cart_service_1.CartServiceReal();
exports.router.post('/genOrder', jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['CLIENT']), async (req, res) => {
    try {
        const { cartId } = req.user;
        if (!cartId) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: 'Missing cartId' });
        }
        const genOrder = await (0, dist_1.genBuyOrder)({
            dependencies: { buyOrderService, cartService },
            payload: { id: cartId }
        });
        if (!genOrder.success) {
            return res.status(404).json({ error: genOrder.error });
        }
        return res.status(200).json({ ok: genOrder.data });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal service error' });
    }
});
exports.default = exports.router;
//# sourceMappingURL=buy-order-router.js.map