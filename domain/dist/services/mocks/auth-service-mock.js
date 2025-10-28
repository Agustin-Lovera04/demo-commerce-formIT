"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationServiceMock = void 0;
const index_1 = require("../../utils/index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const base_service_mock_1 = require("./base-service-mock");
class AuthenticationServiceMock extends base_service_mock_1.BaseServiceMock {
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
        const compare = await (0, index_1.comparePassword)(password, userPassword);
        if (!compare) {
            return { success: false, error: "Invalid password" };
        }
        return { success: true, data: true };
    }
    async generateTokenUser(dataUser, configService) {
        const secret_JWT_KEY = await configService.getSecretKeyJWT();
        if (!secret_JWT_KEY.success)
            return { success: false, error: secret_JWT_KEY.error };
        const token = jsonwebtoken_1.default.sign(dataUser, secret_JWT_KEY.data, { expiresIn: '1h' });
        return { success: true, data: token };
    }
    async hashPassword(password) {
        const hashed = await (0, index_1.hashPassword)(password);
        if (!index_1.hashPassword)
            return { success: false, error: 'Unexpected error in hash password' };
        return { success: true, data: hashed };
    }
}
exports.AuthenticationServiceMock = AuthenticationServiceMock;
//# sourceMappingURL=auth-service-mock.js.map