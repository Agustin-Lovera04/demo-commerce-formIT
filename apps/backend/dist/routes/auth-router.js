"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const index_js_1 = require("../../../../domain/dist/index.js");
const authentication_service_js_1 = require("../infraestructure/services/authentication/authentication-service.js");
const cart_service_js_1 = require("../infraestructure/services/carts/cart-service.js");
const config_service_js_1 = require("../infraestructure/services/config/config-service.js");
const security_password_service_js_1 = require("../infraestructure/services/security-password/security-password-service.js");
exports.router = (0, express_1.Router)();
const securityPassword = new security_password_service_js_1.SecurityPasswordImpl();
const authService = new authentication_service_js_1.AuthenticationService(securityPassword);
const cartService = new cart_service_js_1.CartServiceReal();
const configService = new config_service_js_1.ConfigServiceImpl();
exports.router.post("/register", async (req, res) => {
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
});
exports.router.post("/login", async (req, res) => {
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
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24
        });
        return res.status(200).json(result.data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.router.get('/logout', async (req, res) => {
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
});
exports.default = exports.router;
//# sourceMappingURL=auth-router.js.map