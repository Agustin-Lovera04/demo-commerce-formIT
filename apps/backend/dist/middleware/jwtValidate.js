"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtValidate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dist_1 = require("../../../../domain/dist");
const JWT_SECRET = dist_1.config.SECRET_KEY_JWT;
const jwtValidate = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ error: "You must log in." });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Session expired - Please log in again." });
        }
        return res.status(401).json({ error: "Invalid or unauthorized token." });
    }
};
exports.jwtValidate = jwtValidate;
//# sourceMappingURL=jwtValidate.js.map