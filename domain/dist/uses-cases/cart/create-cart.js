"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCart = createCart;
async function createCart({ dependencies, payload }) {
    try {
        const createCart = await dependencies.createCart();
        if (!createCart.success)
            return { success: false, error: createCart.error };
        if (createCart.data === undefined || !createCart.data.id || !createCart.data.products)
            return { success: false, error: 'Unexpected error in create cart' };
        return { success: true, data: createCart.data };
    }
    catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }
}
//# sourceMappingURL=create-cart.js.map