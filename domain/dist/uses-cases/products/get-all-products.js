"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = getAllProducts;
async function getAllProducts({ dependencies }) {
    if (!dependencies?.findAll) {
        return { success: false, error: 'Missing dependencies or findAll function' };
    }
    const products = await dependencies.findAll();
    if (!products.success)
        return { success: false, error: products.error };
    return { success: true, data: products.data ?? [] };
}
//# sourceMappingURL=get-all-products.js.map