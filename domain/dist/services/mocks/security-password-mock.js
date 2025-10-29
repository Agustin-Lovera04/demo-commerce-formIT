"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityPasswordMock = void 0;
class SecurityPasswordMock {
    async hashPassword(password) {
        return { success: true, data: `hashed_${password}` };
    }
    async comparePassword(password, hashedPassword) {
        if ((hashedPassword === `hashed_${password}`) === false)
            return { success: false, error: 'Invalid Credentials' };
        return { success: true, data: true };
    }
}
exports.SecurityPasswordMock = SecurityPasswordMock;
//# sourceMappingURL=security-password-mock.js.map