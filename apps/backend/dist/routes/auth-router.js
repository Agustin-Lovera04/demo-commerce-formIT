"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const index_js_1 = require("../../../../domain/dist/index.js");
const authentication_service_js_1 = require("../infraestructure/services/authentication/authentication-service.js");
const cart_service_js_1 = require("../infraestructure/services/carts/cart-service.js");
exports.router = (0, express_1.Router)();
const authService = new authentication_service_js_1.AuthenticationService();
const cartService = new cart_service_js_1.CartServiceReal();
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
            dependencies: { authenticationService: authService },
            payload: req.body,
        });
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }
        if (!result.data) {
            return res.status(404).json({ error: 'Internal server error' });
        }
        return res.status(200).json(result.data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = exports.router;
//# sourceMappingURL=auth-router.js.map