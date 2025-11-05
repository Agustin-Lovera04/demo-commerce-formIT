"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const jwtValidate_1 = require("../middleware/jwtValidate");
const accessControl_1 = require("../middleware/accessControl");
const cart_controller_1 = require("../controller/cart-controller");
exports.router = (0, express_1.Router)();
exports.router.get("/getAllCarts", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['CLIENT', 'ADMIN']), cart_controller_1.CartController.getAllCarts);
exports.router.get("/getCart/:id", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['CLIENT', 'ADMIN']), cart_controller_1.CartController.getCartById);
exports.router.post("/", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['PUBLIC']), cart_controller_1.CartController.createCart);
exports.router.delete("/:id", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['ADMIN']), cart_controller_1.CartController.deleteCart);
exports.router.post("/addProduct/:pid", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['CLIENT']), cart_controller_1.CartController.addProductToCart);
exports.router.delete("/deleteProduct/:pid", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['CLIENT']), cart_controller_1.CartController.deleteProductInCart);
exports.default = exports.router;
//# sourceMappingURL=cart-router.js.map