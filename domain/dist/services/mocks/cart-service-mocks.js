"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartServiceMock = void 0;
const base_service_mock_1 = require("./base-service-mock");
const index_1 = require("../../utils/index");
class CartServiceMock extends base_service_mock_1.BaseServiceMock {
    constructor(initialCarts = []) {
        super(initialCarts);
    }
    async createCart() {
        const cart = {
            id: crypto.randomUUID(),
            products: [],
            total: 0,
        };
        this.items.push(cart);
        return { success: true, data: cart };
    }
    async addProductToCart(cid, product) {
        const cartResult = await this.findById(cid);
        if (!cartResult.success || !cartResult.data)
            return { success: false, error: "Cart not found" };
        const cart = cartResult.data;
        const index = cart.products.findIndex(p => p.product === product.id);
        if (index === -1) {
            cart.products.push({
                product: product.id,
                quantity: 1,
                price: product.price,
                subtotal: product.price
            });
        }
        else {
            if (cart.products[index]) {
                const item = cart.products[index];
                item.quantity += 1;
            }
        }
        const { products, total } = (0, index_1.calculateCartTotals)(cart.products);
        cart.products = products;
        cart.total = total;
        const updateResult = await this.editOne(cid, cart);
        if (!updateResult.success)
            return { success: false, error: "Error updating cart" };
        return { success: true, data: updateResult.data };
    }
    async deleteProductInCart(cid, pid) {
        const cartResult = await this.findById(cid);
        if (!cartResult.success || !cartResult.data)
            return { success: false, error: "Cart not found" };
        const cart = cartResult.data;
        cart.products = cart.products.filter(p => p.product !== pid);
        const { products, total } = (0, index_1.calculateCartTotals)(cart.products);
        cart.products = products;
        cart.total = total;
        const updateResult = await this.editOne(cid, cart);
        if (!updateResult.success)
            return { success: false, error: "Error updating cart" };
        return { success: true, data: updateResult.data };
    }
}
exports.CartServiceMock = CartServiceMock;
//# sourceMappingURL=cart-service-mocks.js.map