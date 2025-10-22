"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("../routes/auth-router");
const products_router_1 = require("../routes/products-router");
/*import {router as cartRouter} from "../routes/auth-routes.js"; */
function createApp(db) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    /*  app.use('/cart', cartRouter) */
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