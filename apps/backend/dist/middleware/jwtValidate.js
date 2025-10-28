"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtValidate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_service_js_1 = require("../infraestructure/services/config/config-service.js");
const configService = new config_service_js_1.ConfigServiceImpl();
const jwtValidate = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ error: "You must log in." });
        }
        const secretResult = await configService.getSecretKeyJWT();
        if (!secretResult.success || !secretResult.data) {
            return res.status(500).json({ error: "JWT secret not configured" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretResult.data);
        req.user = decoded;
        next();
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Session expired - Please log in again." });
        }
        return res.status(401).json({ error: "Invalid or unauthorized token." });
    }
};
exports.jwtValidate = jwtValidate;
//# sourceMappingURL=jwtValidate.js.map