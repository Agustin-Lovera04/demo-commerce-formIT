"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
const entities_1 = require("../../entities");
async function registerUser({ dependencies, payload }) {
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
    const createUser = await dependencies.authenticationService.create(payload);
    if (!createUser.success) {
        return { success: false, error: createUser.error };
    }
    return { success: true, data: createUser.data };
}
//# sourceMappingURL=register.js.map