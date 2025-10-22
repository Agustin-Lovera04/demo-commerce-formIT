"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = createProduct;
async function createProduct({ dependencies, payload }) {
    if (!payload)
        return { success: false, error: 'Missing fields' };
    const { title, price, stock } = payload;
    if (!title || !price || !stock) {
        return { success: false, error: 'Missing fields' };
    }
    if (typeof title !== 'string' || typeof price !== 'number' || typeof stock !== 'boolean') {
        return { success: false, error: 'Invalid field types' };
    }
    const findProductByTitle = await dependencies.findProductByTitle(title);
    if (findProductByTitle.success && findProductByTitle.data === true)
        return { success: false, error: 'Found product' };
    const newProduct = { title, price, stock };
    const create = await dependencies.create(newProduct);
    if (!create.success)
        return { success: false, error: create.error };
    return { success: true, data: create.data };
}
//# sourceMappingURL=create-product.js.map