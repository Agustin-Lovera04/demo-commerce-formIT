"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genBuyOrder = genBuyOrder;
async function genBuyOrder({ dependencies, payload }) {
    try {
        const { buyOrderService, cartService } = dependencies;
        const { id } = payload;
        if (!id)
            return { success: false, error: 'Missing id' };
        const existCart = await cartService.findById(id);
        if (!existCart.success)
            return { success: false, error: existCart.error };
        if (existCart.data === undefined)
            return { success: false, error: 'Unexpected error in get Cart' };
        const order = await buyOrderService.genBuyOrder(existCart.data);
        if (!order.success)
            return { success: false, error: order.error };
        if (order.data === undefined)
            return { success: false, error: 'Unexpected error in generate buy order' };
        const cleanCart = await cartService.editOne(id, { products: [], total: 0 });
        if (!cleanCart.success)
            return { success: false, error: cleanCart.error };
        return { success: true, data: order.data };
    }
    catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }
}
//# sourceMappingURL=buy-order.js.map