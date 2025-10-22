"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_service_mocks_1 = require("./../../services/mocks/cart-service-mocks");
const vitest_1 = require("vitest");
const link_user_with_cart_1 = require("./link-user-with-cart");
const user_service_mocks_1 = require("../../services/mocks/user-service-mocks");
const entities_1 = require("../../entities");
const utils_1 = require("../../utils");
(0, vitest_1.describe)('Link cart with user', () => {
    let userService;
    let cartService;
    let services;
    (0, vitest_1.beforeAll)(() => {
        userService = new user_service_mocks_1.UserServiceMock([
            {
                id: 'User1',
                name: 'Agustin',
                email: 'agustin@gmail.com',
                password: 'passTest',
                role: entities_1.UserRole.CLIENT
            }
        ]);
        const rawCart1Products = [
            { product: "Product test", quantity: 2, price: 100, subtotal: 0 },
        ];
        const { products, total } = (0, utils_1.calculateCartTotals)(rawCart1Products);
        cartService = new cart_service_mocks_1.CartServiceMock([
            { id: "Cart1", products, total },
            { id: "Cart2", products: [], total: 0 },
        ]);
        services = { userService, cartService };
    });
    (0, vitest_1.test)('Receive user ID and cart ID to link, it should return the edited user', async () => {
        const result = await (0, link_user_with_cart_1.linkUserWithCart)({
            dependencies: services,
            payload: {
                id: 'User1',
                cartId: 'Cart1'
            }
        });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(result.data).toHaveProperty('cartId', 'Cart1');
        }
    });
    (0, vitest_1.test)('Receive user ID and invalid cart ID to link, it should return the edited user', async () => {
        const result = await (0, link_user_with_cart_1.linkUserWithCart)({
            dependencies: services,
            payload: {
                id: 'User1',
                cartId: 'FAIL'
            }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Not found');
        }
    });
    (0, vitest_1.test)('Receive invalid user ID and cart ID to link, it should return the edited user', async () => {
        const result = await (0, link_user_with_cart_1.linkUserWithCart)({
            dependencies: services,
            payload: {
                id: 'FAIL',
                cartId: 'Cart1'
            }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Not found');
        }
    });
});
//# sourceMappingURL=link-user-with-cart.test.js.map