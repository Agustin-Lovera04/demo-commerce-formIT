"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyOrderServiceReal = void 0;
const buy_order_1 = require("../../../models/buy-order");
function mapOrder(order) {
    return {
        id: order._id.toString(),
        products: order.products,
        total: order.total,
    };
}
class BuyOrderServiceReal {
    async genBuyOrder(cart) {
        try {
            const orderData = {
                cartId: cart.id,
                products: cart.products,
                total: cart.total
            };
            const savedOrder = await buy_order_1.OrderModel.create(orderData);
            return { success: true, data: mapOrder(savedOrder) };
        }
        catch (error) {
            return {
                success: false,
                error: "Error generating order"
            };
        }
    }
    async findAll() {
        try {
            const orders = await buy_order_1.OrderModel.find().lean();
            return { success: true, data: orders.map(mapOrder) };
        }
        catch (error) {
            return { success: false, error: "Error fetching orders" };
        }
    }
    async findById(id) {
        try {
            const order = await buy_order_1.OrderModel.findById(id).lean();
            if (!order)
                return { success: false, error: "Order not found" };
            return { success: true, data: mapOrder(order) };
        }
        catch (error) {
            return { success: false, error: "Error fetching order" };
        }
    }
    async create(payload) {
        try {
            const order = await buy_order_1.OrderModel.create(payload);
            return { success: true, data: mapOrder(order) };
        }
        catch (error) {
            return { success: false, error: "Error creating order" };
        }
    }
    async editOne(id, payload) {
        try {
            const updatedOrder = await buy_order_1.OrderModel.findByIdAndUpdate(id, payload, { new: true }).lean();
            if (!updatedOrder)
                return { success: false, error: "Order not found" };
            return { success: true, data: mapOrder(updatedOrder) };
        }
        catch (error) {
            return { success: false, error: "Error updating order" };
        }
    }
    async deleteOne(id) {
        try {
            const deletedOrder = await buy_order_1.OrderModel.findByIdAndDelete(id).lean();
            if (!deletedOrder)
                return { success: false, error: "Order not found" };
            return { success: true, data: undefined };
        }
        catch (error) {
            return { success: false, error: "Error deleting order" };
        }
    }
}
exports.BuyOrderServiceReal = BuyOrderServiceReal;
//# sourceMappingURL=buy-order-service.js.map