"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartServiceReal = void 0;
const index_1 = require("../../../../../../domain/dist/index");
const cart_model_1 = require("../../../models/cart-model");
function mapCart(cart) {
    return {
        id: cart._id?.toString() ?? cart.id,
        products: cart.products.map((p) => ({
            product: p.product,
            quantity: p.quantity,
            price: p.price ?? 0,
            subtotal: p.subtotal ?? 0,
        })),
        total: cart.total ?? 0,
    };
}
class CartServiceReal {
    async create() {
        return this.createCart();
    }
    async createCart() {
        try {
            const cart = await cart_model_1.CartModel.create({
                products: [],
                total: 0,
            });
            return { success: true, data: mapCart(cart.toObject()) };
        }
        catch (error) {
            return { success: false, error: "Error creating cart" };
        }
    }
    async findById(id) {
        try {
            const cart = await cart_model_1.CartModel.findById(id).lean();
            if (!cart)
                return { success: false, error: "Cart not found" };
            return { success: true, data: mapCart(cart) };
        }
        catch (error) {
            return { success: false, error: "Error fetching cart" };
        }
    }
    async editOne(id, payload) {
        try {
            const updated = await cart_model_1.CartModel.findByIdAndUpdate(id, payload, { new: true }).lean();
            if (!updated)
                return { success: false, error: "Cart not found" };
            return { success: true, data: mapCart(updated) };
        }
        catch (error) {
            return { success: false, error: "Error editing cart" };
        }
    }
    async findAll() {
        try {
            const carts = await cart_model_1.CartModel.find().lean();
            return { success: true, data: carts.map(mapCart) };
        }
        catch (error) {
            return { success: false, error: "Error fetching carts" };
        }
    }
    async deleteOne(id) {
        try {
            const deleted = await cart_model_1.CartModel.findByIdAndDelete(id).lean();
            if (!deleted)
                return { success: false, error: "Cart not found" };
            return { success: true, data: undefined };
        }
        catch (error) {
            return { success: false, error: "Error deleting cart" };
        }
    }
    async addProductToCart(cid, product) {
        try {
            const cartResult = await this.findById(cid);
            if (!cartResult.success || !cartResult.data)
                return { success: false, error: "Cart not found" };
            const cart = cartResult.data;
            const index = cart.products.findIndex((p) => p.product === product.id);
            if (index === -1) {
                cart.products.push({
                    product: product.id,
                    quantity: 1,
                    price: product.price,
                    subtotal: product.price,
                });
            }
            else {
                if (cart.products[index]) {
                    cart.products[index].quantity += 1;
                }
            }
            const { products, total } = (0, index_1.calculateCartTotals)(cart.products);
            cart.products = products;
            cart.total = total;
            const updateResult = await this.editOne(cid, cart);
            if (!updateResult.success)
                return { success: false, error: "Error updating cart" };
            return { success: true, data: mapCart(updateResult.data) };
        }
        catch (error) {
            return { success: false, error: "Error adding product to cart" };
        }
    }
    async deleteProductInCart(cid, pid) {
        try {
            const cartResult = await this.findById(cid);
            if (!cartResult.success || !cartResult.data)
                return { success: false, error: "Cart not found" };
            const cart = cartResult.data;
            cart.products = cart.products.filter((p) => p.product !== pid);
            const { products, total } = (0, index_1.calculateCartTotals)(cart.products);
            cart.products = products;
            cart.total = total;
            const updateResult = await this.editOne(cid, cart);
            if (!updateResult.success)
                return { success: false, error: "Error updating cart" };
            return { success: true, data: mapCart(updateResult.data) };
        }
        catch (error) {
            return { success: false, error: "Error deleting product from cart" };
        }
    }
}
exports.CartServiceReal = CartServiceReal;
//# sourceMappingURL=cart-service.js.map