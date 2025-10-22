"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const index_js_1 = require("../../../../../../domain/dist/index.js");
const user_model_1 = require("../../../models/user-model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthenticationService {
    async findAll() {
        try {
            const users = await user_model_1.UserModel.find().lean();
            return { success: true, data: users };
        }
        catch (error) {
            return { success: false, error: "Error fetching users" };
        }
    }
    async findById(id) {
        try {
            const user = await user_model_1.UserModel.findById(id).lean();
            if (!user)
                return { success: false, error: "User not found" };
            return { success: true, data: user };
        }
        catch (error) {
            return { success: false, error: "Error fetching user" };
        }
    }
    async findUserByEmail(email) {
        try {
            const user = await user_model_1.UserModel.findOne({ email }).lean();
            if (!user)
                return { success: false, error: "User not found" };
            return { success: true, data: user };
        }
        catch (error) {
            return { success: false, error: "Error searching user by email" };
        }
    }
    async create(dataUser) {
        try {
            const newUser = await user_model_1.UserModel.create(dataUser);
            return { success: true, data: newUser.toObject() };
        }
        catch (error) {
            return { success: false, error: "Error creating user" };
        }
    }
    async validEmail(email) {
        const exReg = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        const valid = exReg.test(email);
        if (!valid)
            return { success: false, error: "Invalid email" };
        return { success: true, data: true };
    }
    async validPassword(password, user) {
        if (password !== user.password) {
            return { success: false, error: "Invalid password" };
        }
        return { success: true, data: user };
    }
    async generateTokenUser(dataUser) {
        try {
            const token = jsonwebtoken_1.default.sign(dataUser, index_js_1.config.SECRET_KEY_JWT, { expiresIn: "1h" });
            return { success: true, data: { token } };
        }
        catch (error) {
            return { success: false, error: "Error generating token" };
        }
    }
    async editOne(id, payload) {
        try {
            const updatedUser = await user_model_1.UserModel.findByIdAndUpdate(id, payload, { new: true }).lean();
            if (!updatedUser)
                return { success: false, error: "User not found" };
            return { success: true, data: updatedUser };
        }
        catch (error) {
            return { success: false, error: "Error editing user" };
        }
    }
    async deleteOne(id) {
        try {
            const deleted = await user_model_1.UserModel.findByIdAndDelete(id).lean();
            if (!deleted)
                return { success: false, error: "User not found" };
            return { success: true, data: undefined };
        }
        catch (error) {
            return { success: false, error: "Error deleting user" };
        }
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication-service.js.map