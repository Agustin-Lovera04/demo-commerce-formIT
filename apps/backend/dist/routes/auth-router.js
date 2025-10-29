"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth-controller");
exports.router = (0, express_1.Router)();
exports.router.post("/register", auth_controller_1.AuthController.register);
exports.router.post("/login", auth_controller_1.AuthController.login);
exports.router.get('/logout', auth_controller_1.AuthController.logout);
exports.default = exports.router;
//# sourceMappingURL=auth-router.js.map