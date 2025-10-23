"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = comparePassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function comparePassword(password, hashedPassword) {
    const match = await bcrypt_1.default.compare(password, hashedPassword);
    return match;
}
//# sourceMappingURL=compare-password.js.map