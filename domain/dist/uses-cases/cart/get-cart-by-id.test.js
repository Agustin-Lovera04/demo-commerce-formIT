"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_service_mocks_1 = require("../../services/mocks/cart-service-mocks");
const vitest_1 = require("vitest");
const get_cart_by_id_1 = require("./get-cart-by-id");
const utils_1 = require("../../utils");
(0, vitest_1.describe)('Get cart by id', () => {
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
    (0, vitest_1.test)('Receives id cart and should return the cart with this id', async () => {
        const result = await (0, get_cart_by_id_1.getCartById)({
            dependencies: cartService,
            payload: { id: 'Cart1' }
        });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(result.data).toStrictEqual({
                id: 'Cart1',
                products: [{
                        product: 'Product test',
                        quantity: 2,
                        price: 100,
                        subtotal: 200
                    }],
                total: 200
            });
        }
    });
    (0, vitest_1.test)('Receives invalid id cart and should return an error', async () => {
        const result = await (0, get_cart_by_id_1.getCartById)({
            dependencies: cartService,
            payload: { id: 'FAIL' }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Not found');
        }
    });
    (0, vitest_1.test)('Not receives id cart and should return an error', async () => {
        const result = await (0, get_cart_by_id_1.getCartById)({
            dependencies: cartService,
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Missing id');
        }
    });
});
//# sourceMappingURL=get-cart-by-id.test.js.map