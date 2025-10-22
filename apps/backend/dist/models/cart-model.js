"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    products: [
        {
            product: { type: String, required: true },
            quantity: { type: Number, default: 1 },
            price: { type: Number },
            subtotal: { type: Number }
        },
    ],
    total: { type: Number, required: true, default: 0 }
});
exports.CartModel = mongoose_1.default.model("Cart", cartSchema);
//# sourceMappingURL=cart-model.js.map