"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityPasswordImpl = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class SecurityPasswordImpl {
    async hashPassword(password) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
            return { success: true, data: hashedPassword };
        }
        catch (error) {
            return { success: false, error: "Error hashing password" };
        }
    }
    async comparePassword(password, hashedPassword) {
        try {
            const match = await bcrypt_1.default.compare(password, hashedPassword);
            if (match === false)
                return { success: false, error: "Invalid credentials" };
            return { success: true, data: match };
        }
        catch (error) {
            return { success: false, error: "Error comparing password" };
        }
    }
}
exports.SecurityPasswordImpl = SecurityPasswordImpl;
//# sourceMappingURL=security-password-service.js.map