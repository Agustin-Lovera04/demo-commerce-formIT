"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationServiceMock = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const base_service_mock_1 = require("./base-service-mock");
const security_password_mock_1 = require("./security-password-mock");
class AuthenticationServiceMock extends base_service_mock_1.BaseServiceMock {
    securityService = new security_password_mock_1.SecurityPasswordMock();
    constructor(initialUsers = []) {
        super(initialUsers);
    }
    async findUserByEmail(email) {
        const user = this.items.find(u => u.email === email);
        if (!user) {
            return { success: false, error: 'User not found' };
        }
        return { success: true, data: user };
    }
    async validEmail(email) {
        let exReg = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        let valid = exReg.test(email);
        if (!valid)
            return { success: false, error: 'Invalid email' };
        return { success: true, data: true };
    }
    async validPassword(password, userPassword) {
        const compare = await this.securityService.comparePassword(password, userPassword);
        if (!compare.success) {
            return { success: false, error: compare.error };
        }
        return { success: true, data: compare.data };
    }
    async generateTokenUser(dataUser, configService) {
        const secret_JWT_KEY = await configService.getSecretKeyJWT();
        if (!secret_JWT_KEY.success)
            return { success: false, error: secret_JWT_KEY.error };
        const token = jsonwebtoken_1.default.sign(dataUser, secret_JWT_KEY.data, { expiresIn: '1h' });
        return { success: true, data: token };
    }
    async hashPassword(password) {
        const hashed = await this.securityService.hashPassword(password);
        if (!hashed.success)
            return { success: false, error: hashed.error };
        return { success: true, data: hashed.data };
    }
}
exports.AuthenticationServiceMock = AuthenticationServiceMock;
//# sourceMappingURL=auth-service-mock.js.map