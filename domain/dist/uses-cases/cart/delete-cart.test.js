"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const delete_cart_1 = require("./delete-cart");
const cart_service_mocks_1 = require("../../services/mocks/cart-service-mocks");
const utils_1 = require("../../utils");
(0, vitest_1.describe)('Delete cart', () => {
    let cartService;
    (0, vitest_1.beforeAll)(() => {
        const rawCart1Products = [
            { product: "Product test", quantity: 2, price: 100, subtotal: 0 },
        ];
        const { products, total } = (0, utils_1.calculateCartTotals)(rawCart1Products);
        cartService = new cart_service_mocks_1.CartServiceMock([
            { id: "Cart1", products, total },
            { id: "Cart2", products: [], total: 0 },
        ]);
    });
    (0, vitest_1.test)('Receives the cart id and should delete the cart in the DB and return an exit message', async () => {
        const result = await (0, delete_cart_1.deleteCart)({
            dependencies: cartService,
            payload: { id: 'Cart1' }
        });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(result.data).toBe(undefined);
        }
    });
    (0, vitest_1.test)('Receives invalid id cart and should delete the cart in the DB and return an exit message', async () => {
        const result = await (0, delete_cart_1.deleteCart)({
            dependencies: cartService,
            payload: { id: 'FAIL' }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Not found');
        }
    });
    (0, vitest_1.test)('Not receives id cart and should delete the cart in the DB and return an exit message', async () => {
        const result = await (0, delete_cart_1.deleteCart)({
            dependencies: cartService,
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Missing id');
        }
    });
});
//# sourceMappingURL=delete-cart.test.js.map