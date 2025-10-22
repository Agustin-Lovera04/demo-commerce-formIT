"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_service_mocks_1 = require("../../services/mocks/cart-service-mocks");
const vitest_1 = require("vitest");
const create_cart_1 = require("./create-cart");
(0, vitest_1.describe)('Create cart', () => {
    let cartService;
    (0, vitest_1.beforeAll)(() => {
        cartService = new cart_service_mocks_1.CartServiceMock();
    });
    (0, vitest_1.test)('Create cart and should return the same', async () => {
        const result = await (0, create_cart_1.createCart)({
            dependencies: cartService
        });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(result.data).toEqual(vitest_1.expect.objectContaining({
                id: vitest_1.expect.any(String),
                products: vitest_1.expect.any(Array),
                total: vitest_1.expect.any(Number)
            }));
        }
    });
});
//# sourceMappingURL=create-cart.test.js.map