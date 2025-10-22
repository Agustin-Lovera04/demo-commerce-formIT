"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const products_service_mock_1 = require("../../services/mocks/products-service-mock");
const cart_service_mocks_1 = require("../../services/mocks/cart-service-mocks");
const delete_product_in_cart_1 = require("./delete-product-in-cart");
const utils_1 = require("../../utils");
(0, vitest_1.describe)('Delete product in cart', () => {
    let cartService;
    let productService;
    let services;
    (0, vitest_1.beforeAll)(() => {
        const rawCart1Products = [
            { product: "Product test", quantity: 2, price: 100, subtotal: 0 },
        ];
        const { products, total } = (0, utils_1.calculateCartTotals)(rawCart1Products);
        cartService = new cart_service_mocks_1.CartServiceMock([
            { id: "Cart1", products, total },
            { id: "Cart2", products: [], total: 0 },
        ]);
        productService = new products_service_mock_1.ProductsServiceMock([
            { id: 'prod1', title: 'Product 1', price: 1000, stock: true },
            { id: 'stockFalse', title: 'Product 2', price: 1000, stock: false }
        ]);
        services = { cartService, productService };
    });
    (0, vitest_1.test)('Receives a cart id and a product id and delete it to the cart, and returns the cart', async () => {
        const result = await (0, delete_product_in_cart_1.deleteProductInCart)({
            dependencies: services,
            payload: { cid: 'Cart1', pid: 'prod1' }
        });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(result.data).toBe(undefined);
        }
    });
    (0, vitest_1.test)('Receives a invalid cart id and a product id and delete it to the cart, and returns the cart', async () => {
        const result = await (0, delete_product_in_cart_1.deleteProductInCart)({
            dependencies: services,
            payload: { cid: 'FAIL', pid: 'prod1' }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Not found');
        }
    });
    (0, vitest_1.test)('Receives a cart id and a invalid product id and delete it to the cart, and returns the cart', async () => {
        const result = await (0, delete_product_in_cart_1.deleteProductInCart)({
            dependencies: services,
            payload: { cid: 'Cart1', pid: 'FAIL' }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Not found');
        }
    });
});
//# sourceMappingURL=delete-product-in-cart.test.js.map