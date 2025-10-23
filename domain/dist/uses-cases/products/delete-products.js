"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducts = deleteProducts;
async function deleteProducts({ dependencies, payload }) {
    try {
        if (!payload)
            return { success: false, error: 'Missing id' };
        const { id } = payload;
        if (!id)
            return { success: false, error: 'Missing id' };
        const deleteProduct = await dependencies.deleteOne(id);
        if (!deleteProduct.success)
            return { success: false, error: deleteProduct.error };
        return { success: true, data: undefined };
    }
    catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }
}
//# sourceMappingURL=delete-products.js.map