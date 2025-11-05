"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = createProduct;
async function createProduct({ dependencies, payload }) {
    try {
        if (!payload)
            return { success: false, error: 'Missing fields' };
        const { title, price } = payload;
        if (!title || !price) {
            return { success: false, error: 'Missing fields' };
        }
        let stock = true;
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
    catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }
}
//# sourceMappingURL=create-product.js.map