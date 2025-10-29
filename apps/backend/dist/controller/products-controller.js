"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const products_service_1 = require("../infraestructure/services/products/products-service");
const dist_1 = require("../../../../domain/dist");
const productsService = new products_service_1.ProductsServiceReal();
class ProductsController {
    static async getAllProducts(req, res) {
        try {
            const result = await (0, dist_1.getAllProducts)({
                dependencies: productsService,
            });
            if (!result.success) {
                return res.status(400).json({ error: result.error });
            }
            return res.status(201).json({ products: result.data });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    static async getProductById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(404).json({ error: 'Missing id' });
            }
            const result = await (0, dist_1.getProductById)({
                dependencies: productsService,
                payload: { id }
            });
            if (!result.success) {
                return res.status(400).json({ error: result.error });
            }
            return res.status(201).json({ product: result.data });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    static async createProduct(req, res) {
        try {
            const result = await (0, dist_1.createProduct)({
                dependencies: productsService,
                payload: req.body
            });
            if (!result.success) {
                return res.status(400).json({ error: result.error });
            }
            return res.status(201).json({ product: result.data });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    static async editProduct(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(404).json({ error: 'Missing id' });
            }
            const result = await (0, dist_1.editProducts)({
                dependencies: productsService,
                payload: { id, ...req.body }
            });
            if (!result.success) {
                return res.status(400).json({ error: result.error });
            }
            return res.status(201).json({ product: result.data });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(404).json({ error: 'Missing id' });
            }
            const result = await (0, dist_1.deleteProducts)({
                dependencies: productsService,
                payload: { id }
            });
            if (!result.success) {
                return res.status(400).json({ error: result.error });
            }
            return res.status(201).json({ product: result.data });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.ProductsController = ProductsController;
//# sourceMappingURL=products-controller.js.map