"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyOrderController = void 0;
const buy_order_service_1 = require("../infraestructure/services/buy-order/buy-order-service");
const dist_1 = require("../../../../domain/dist");
const cart_service_1 = require("../infraestructure/services/carts/cart-service");
const buyOrderService = new buy_order_service_1.BuyOrderServiceReal();
const cartService = new cart_service_1.CartServiceReal();
class BuyOrderController {
    static async genOrder(req, res) {
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
    }
    static async getOrder(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(404).json({ error: 'Missing order id' });
            }
            const getOrder = await buyOrderService.findById(id);
            if (!getOrder.success) {
                return res.status(404).json({ error: getOrder.error });
            }
            return res.status(200).json({ ok: getOrder.data });
        }
        catch (error) {
            return res.status(500).json({ error: 'Internal service error' });
        }
    }
}
exports.BuyOrderController = BuyOrderController;
//# sourceMappingURL=buy-order-controller.js.map