"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const index_js_1 = require("../../../../domain/dist/index.js");
const authentication_service_js_1 = require("../infraestructure/services/authentication/authentication-service.js");
const cart_service_js_1 = require("../infraestructure/services/carts/cart-service.js");
const config_service_js_1 = require("../infraestructure/services/config/config-service.js");
const security_password_service_js_1 = require("../infraestructure/services/security-password/security-password-service.js");
const securityPassword = new security_password_service_js_1.SecurityPasswordImpl();
const authService = new authentication_service_js_1.AuthenticationService(securityPassword);
const cartService = new cart_service_js_1.CartServiceReal();
const configService = new config_service_js_1.ConfigServiceImpl();
class AuthController {
    static async register(req, res) {
        try {
            const result = await (0, index_js_1.registerUser)({
                dependencies: { authenticationService: authService, cartService },
                payload: req.body,
            });
            if (!result.success) {
                return res.status(400).json({ error: result.error });
            }
            return res.status(201).json({ user: result.data });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    static async login(req, res) {
        try {
            const result = await (0, index_js_1.loginUser)({
                dependencies: { authenticationService: authService, configService },
                payload: req.body,
            });
            if (!result.success) {
                return res.status(400).json({ error: result.error });
            }
            if (!result.data) {
                return res.status(404).json({ error: 'Internal server error' });
            }
            res.cookie("token", result.data, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 1000 * 60 * 60 * 24,
            });
            return res.status(200).json(result.data);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    static async logout(req, res) {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                sameSite: 'strict',
            });
            return res.status(200).json({ ok: 'Session closed' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth-controller.js.map