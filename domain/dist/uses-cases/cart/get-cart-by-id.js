"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartById = getCartById;
async function getCartById({ dependencies, payload }) {
    try {
        const id = payload?.id;
        if (!id)
            return { success: false, error: 'Missing id' };
        const findCart = await dependencies.findById(id);
        if (!findCart.success)
            return { success: false, error: findCart.error };
        if (findCart.data === undefined)
            return { success: false, error: 'Unexpected error in find cart' };
        return { success: true, data: findCart.data };
    }
    catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }
}
//# sourceMappingURL=get-cart-by-id.js.map