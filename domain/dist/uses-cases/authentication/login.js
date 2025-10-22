"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
async function loginUser({ dependencies, payload }) {
    const { email, password } = payload;
    let valid = await dependencies.authenticationService.validEmail(email);
    if (!valid.success)
        return { success: false, error: valid.error };
    let existUserInDB = await dependencies.authenticationService.findUserByEmail(email);
    if (!existUserInDB.success || existUserInDB.data == undefined) {
        return { success: false, error: 'Invalid credentials' };
    }
    let validPassword = await dependencies.authenticationService.validPassword(password, existUserInDB.data);
    if (!validPassword.success) {
        return { success: false, error: 'Invalid credentials' };
    }
    const token = await dependencies.authenticationService.generateTokenUser(existUserInDB.data);
    if (!token.success || token.data == undefined) {
        return { success: false, error: 'Internal error in login process' };
    }
    return { success: true, data: { token: token.data } };
}
//# sourceMappingURL=login.js.map