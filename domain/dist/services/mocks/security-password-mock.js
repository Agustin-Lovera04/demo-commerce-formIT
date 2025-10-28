"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityPasswordMock = void 0;
class SecurityPasswordMock {
    async hashPassword(password) {
        return { success: true, data: `hashed_${password}` };
    }
    async comparePassword(password, hashedPassword) {
        return { success: true, data: hashedPassword === `hashed_${password}` };
    }
}
exports.SecurityPasswordMock = SecurityPasswordMock;
//# sourceMappingURL=security-password-mock.js.map