"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsServiceReal = void 0;
const products_model_1 = require("../../../models/products-model");
class ProductsServiceReal {
    async findAll() {
        try {
            const products = await products_model_1.ProductModel.find().lean();
            return { success: true, data: products };
        }
        catch (error) {
            return { success: false, error: "Error fetching product" };
        }
    }
    async findById(id) {
        try {
            const product = await products_model_1.ProductModel.findById(id).lean();
            if (!product)
                return { success: false, error: "Product not found" };
            return { success: true, data: product };
        }
        catch (error) {
            return { success: false, error: "Error fetching product" };
        }
    }
    async create(dataUser) {
        try {
            const newUser = await products_model_1.ProductModel.create(dataUser);
            return { success: true, data: newUser.toObject() };
        }
        catch (error) {
            return { success: false, error: "Error creating product" };
        }
    }
    async editOne(id, payload) {
        try {
            const updatedProduct = await products_model_1.ProductModel.findByIdAndUpdate(id, payload, { new: true }).lean();
            if (!updatedProduct)
                return { success: false, error: "Product not found" };
            return { success: true, data: updatedProduct };
        }
        catch (error) {
            return { success: false, error: "Error editing product" };
        }
    }
    async deleteOne(id) {
        try {
            const deleted = await products_model_1.ProductModel.findByIdAndDelete(id).lean();
            if (!deleted)
                return { success: false, error: "Product not found" };
            return { success: true, data: undefined };
        }
        catch (error) {
            return { success: false, error: "Error deleting product" };
        }
    }
    async validFields(payload) {
        try {
            const validFields = ['id', 'title', 'price', 'stock'];
            for (const key in payload) {
                if (!validFields.includes(key)) {
                    return { success: false, error: `Invalid field: ${key}` };
                }
                const value = payload[key];
                switch (key) {
                    case 'id':
                    case 'title':
                        if (typeof value !== 'string' || value.trim() === '') {
                            return { success: false, error: 'Invalid title, expected non-empty string' };
                        }
                        break;
                    case 'price':
                        if (typeof value !== 'number' || isNaN(value)) {
                            return { success: false, error: 'Invalid price, expected a number' };
                        }
                        break;
                    case 'stock':
                        if (typeof value !== 'boolean') {
                            return { success: false, error: 'Invalid stock, expected boolean' };
                        }
                        break;
                }
            }
            return { success: true, data: true };
        }
        catch (error) {
            return { success: false, error: 'Unexpected error while validating fields' };
        }
    }
    async findProductByTitle(title) {
        try {
            const product = await products_model_1.ProductModel.findOne({ title }).lean();
            if (!product) {
                return { success: true, data: false };
            }
            return { success: true, data: true };
        }
        catch (error) {
            return { success: false, error: 'Unexpected error while finding product by title' };
        }
    }
}
exports.ProductsServiceReal = ProductsServiceReal;
//# sourceMappingURL=products-service.js.map