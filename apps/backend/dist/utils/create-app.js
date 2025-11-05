"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("../routes/auth-router");
const products_router_1 = require("../routes/products-router");
const cart_router_1 = require("../routes/cart-router");
const buy_order_router_1 = require("../routes/buy-order-router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
function createApp(db) {
    const app = (0, express_1.default)();
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    }));
    app.use('/buyOrder', buy_order_router_1.router);
    app.use('/cart', cart_router_1.router);
    app.use('/products', products_router_1.router);
    app.use('/auth', auth_router_1.router);
    app.get('/', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ ok: 'Hola' });
    });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
//# sourceMappingURL=create-app.js.map