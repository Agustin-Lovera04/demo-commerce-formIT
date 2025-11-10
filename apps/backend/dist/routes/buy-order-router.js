"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const buy_order_controller_1 = require("../controller/buy-order-controller");
const accessControl_1 = require("../middleware/accessControl");
const jwtValidate_1 = require("../middleware/jwtValidate");
exports.router = (0, express_1.Router)();
exports.router.get('/getOrder/:id', jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['CLIENT']), buy_order_controller_1.BuyOrderController.getOrder);
exports.router.post('/genOrder', jwtValidate_1.jwtValidate, (0, accessControl_1.accessControl)(['CLIENT']), buy_order_controller_1.BuyOrderController.genOrder);
exports.default = exports.router;
//# sourceMappingURL=buy-order-router.js.map