"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    cartId: { type: String, required: true },
    products: [
        {
            product: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            subtotal: { type: Number, required: true },
        },
    ],
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.OrderModel = mongoose_1.default.model("Orders", orderSchema);
//# sourceMappingURL=buy-order.js.map