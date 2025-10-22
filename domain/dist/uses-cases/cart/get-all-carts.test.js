"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const cart_service_mocks_1 = require("../../services/mocks/cart-service-mocks");
const get_all_carts_1 = require("./get-all-carts");
const utils_1 = require("../../utils");
(0, vitest_1.describe)('Get All carts', () => {
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
    (0, vitest_1.test)('Get all carts', async () => {
        const result = await (0, get_all_carts_1.getCarts)({
            dependencies: cartService
        });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(Array.isArray(result.data)).toBe(true);
            (0, vitest_1.expect)(result.data).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    id: vitest_1.expect.any(String),
                    products: vitest_1.expect.any(Array)
                })
            ]));
        }
    });
});
//# sourceMappingURL=get-all-carts.test.js.map