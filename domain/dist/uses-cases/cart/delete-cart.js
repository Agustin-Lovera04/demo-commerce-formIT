"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCart = deleteCart;
async function deleteCart({ dependencies, payload }) {
    try {
        const id = payload?.id;
        if (!id)
            return { success: false, error: 'Missing id' };
        const deleteCart = await dependencies.deleteOne(id);
        if (!deleteCart.success)
            return { success: false, error: deleteCart.error };
        return { success: true, data: undefined };
    }
    catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }
}
//# sourceMappingURL=delete-cart.js.map