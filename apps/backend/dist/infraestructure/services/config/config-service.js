"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigServiceImpl = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class ConfigServiceImpl {
    async getSecretKeyJWT() {
        const secret = process.env.SECRET_KEY_JWT;
        if (!secret) {
            return {
                success: false,
                error: "JWT secret not configured"
            };
        }
        return {
            success: true,
            data: secret
        };
    }
}
exports.ConfigServiceImpl = ConfigServiceImpl;
//# sourceMappingURL=config-service.js.map