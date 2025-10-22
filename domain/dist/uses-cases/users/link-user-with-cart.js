"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkUserWithCart = linkUserWithCart;
async function linkUserWithCart({ dependencies, payload }) {
    const { userService, cartService } = dependencies;
    const { id, cartId } = payload;
    if (!id || !cartId)
        return { success: false, error: 'Missing fields' };
    const existCart = await cartService.findById(cartId);
    if (!existCart.success)
        return { success: false, error: existCart.error };
    const existUser = await userService.findById(id);
    if (!existUser.success)
        return { success: false, error: existUser.error };
    const editUser = await userService.editOne(id, { cartId });
    if (!editUser.success)
        return { success: false, error: editUser.error };
    return { success: true, data: editUser.data };
}
//# sourceMappingURL=link-user-with-cart.js.map