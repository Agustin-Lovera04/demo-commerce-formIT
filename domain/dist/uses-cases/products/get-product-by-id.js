"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = getProductById;
async function getProductById({ dependencies, payload }) {
    if (!dependencies?.findById) {
        return { success: false, error: 'Missing dependencies or findById function' };
    }
    const id = payload?.id;
    if (!id)
        return { success: false, error: 'Missing id' };
    const product = await dependencies.findById(id);
    if (!product.success)
        return { success: false, error: product.error };
    if (!product.data)
        return { success: false, error: 'Product not found' };
    return { success: true, data: product.data };
}
//# sourceMappingURL=get-product-by-id.js.map