"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToCart = addProductToCart;
async function addProductToCart({ dependencies, payload }) {
    const { cartService, productService } = dependencies;
    const { cid, pid } = payload;
    if (!cid || !pid)
        return { success: false, error: 'Missing Cart id or Product Id' };
    const existCart = await cartService.findById(cid);
    if (!existCart.success)
        return { success: false, error: existCart.error };
    const existProduct = await productService.findById(pid);
    if (!existProduct.success)
        return { success: false, error: existProduct.error };
    if (existProduct.data?.stock === false)
        return { success: false, error: 'Out of stock' };
    const addProductToCart = await cartService.addProductToCart(cid, existProduct.data);
    if (!addProductToCart.success)
        return { success: false, error: addProductToCart.error };
    if (addProductToCart.data === undefined)
        return { success: false, error: 'Unexpected error in add product to cart' };
    return { success: true, data: undefined };
}
//# sourceMappingURL=add-product-to-cart.js.map