"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarts = getCarts;
async function getCarts({ dependencies, payload }) {
    try {
        const getCarts = await dependencies.findAll();
        if (!getCarts.success)
            return { success: false, error: getCarts.error };
        return { success: true, data: getCarts.data };
    }
    catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }
}
//# sourceMappingURL=get-all-carts.js.map