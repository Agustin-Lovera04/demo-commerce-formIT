"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserRole = void 0;
const mongoose_1 = require("mongoose");
exports.UserRole = {
    ADMIN: 'ADMIN',
    CLIENT: 'CLIENT'
};
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartId: { type: String },
    name: { type: String },
    role: { type: String, UserRole: exports.UserRole },
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user-model.js.map