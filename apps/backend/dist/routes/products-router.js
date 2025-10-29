"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const accessControl_1 = require("../middleware/accessControl");
const jwtValidate_1 = require("../middleware/jwtValidate");
const products_controller_1 = require("src/controller/products-controller");
exports.router = (0, express_1.Router)();
exports.router.get("/getAllProducts", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['CLIENT', 'ADMIN']), products_controller_1.ProductsController.getAllProducts);
exports.router.get("/getProduct/:id", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['CLIENT', 'ADMIN']), products_controller_1.ProductsController.getProductById);
exports.router.post("/createProduct", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['ADMIN']), products_controller_1.ProductsController.createProduct);
exports.router.put("/editProduct/:id", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['ADMIN']), products_controller_1.ProductsController.editProduct);
exports.router.delete("/deleteProduct/:id", jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['ADMIN']), products_controller_1.ProductsController.deleteProduct);
exports.default = exports.router;
//# sourceMappingURL=products-router.js.map