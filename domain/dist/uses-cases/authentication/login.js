"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
async function loginUser({ dependencies, payload }) {
    try {
        console.log('deps', dependencies);
        console.log('pay', payload);
        const { email, password } = payload;
        let valid = await dependencies.authenticationService.validEmail(email);
        console.log('valid', valid);
        if (!valid.success)
            return { success: false, error: valid.error };
        let existUserInDB = await dependencies.authenticationService.findUserByEmail(email);
        console.log('existUser', existUserInDB);
        if (!existUserInDB.success || existUserInDB.data == undefined) {
            return { success: false, error: 'Invalid credentials' };
        }
        let validPassword = await dependencies.authenticationService.validPassword(password, existUserInDB.data.password);
        console.log('validPass', validPassword);
        if (!validPassword.success) {
            return { success: false, error: 'Invalid credentials' };
        }
        const userSafeField = existUserInDB.data;
        const token = await dependencies.authenticationService.generateTokenUser(userSafeField, dependencies.configService);
        console.log('token', token);
        if (!token.success || token.data == undefined) {
            return { success: false, error: 'Internal error in login process' };
        }
        return { success: true, data: token.data };
    }
    catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }
}
//# sourceMappingURL=login.js.map