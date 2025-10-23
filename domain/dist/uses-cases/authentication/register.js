"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
const entities_1 = require("../../entities");
async function registerUser({ dependencies, payload }) {
    try {
        const { email, password } = payload;
        let validEmail = await dependencies.authenticationService.validEmail(email);
        if (!validEmail.success)
            return { success: false, error: validEmail.error };
        if (!password || password.length === 0)
            return { success: false, error: 'Invalid password' };
        let existUserInDB = await dependencies.authenticationService.findUserByEmail(email);
        if (existUserInDB.success && existUserInDB.data) {
            return { success: false, error: 'User already exists' };
        }
        if (email.toLowerCase() === 'admin@admin.com') {
            payload.role = entities_1.UserRole.ADMIN;
        }
        const cart = await dependencies.cartService.createCart();
        if (!cart.success)
            return { success: false, error: cart.error };
        if (cart.data.id) {
            payload.cartId = cart.data.id;
        }
        const hashPassword = await dependencies.authenticationService.hashPassword(password);
        if (!hashPassword.success)
            return { success: false, error: hashPassword.error };
        if (hashPassword.success) {
            payload.password = hashPassword.data;
        }
        const createUser = await dependencies.authenticationService.create(payload);
        if (!createUser.success) {
            return { success: false, error: createUser.error };
        }
        return { success: true, data: createUser.data };
    }
    catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }
}
//# sourceMappingURL=register.js.map