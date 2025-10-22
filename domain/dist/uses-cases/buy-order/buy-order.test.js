"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_service_mocks_1 = require("./../../services/mocks/cart-service-mocks");
const vitest_1 = require("vitest");
const buy_order_mock_1 = require("../../services/mocks/buy-order-mock");
const buy_order_1 = require("./buy-order");
const utils_1 = require("../../utils");
(0, vitest_1.describe)('Buy order generate', () => {
    let buyOrderService;
    let cartService;
    let services;
    (0, vitest_1.beforeAll)(() => {
        buyOrderService = new buy_order_mock_1.BuyOrderServiceMock();
        const rawCart1Products = [
            { product: "Product test", quantity: 2, price: 100, subtotal: 0 },
        ];
        const { products, total } = (0, utils_1.calculateCartTotals)(rawCart1Products);
        cartService = new cart_service_mocks_1.CartServiceMock([
            { id: "Cart1", products, total },
            { id: "Cart2", products: [], total: 0 },
        ]);
        services = { buyOrderService, cartService };
    });
    (0, vitest_1.test)('Receives a cart id and should generate buy order, and return order', async () => {
        const result = await (0, buy_order_1.genBuyOrder)({
            dependencies: { buyOrderService, cartService },
            payload: { id: 'Cart1' }
        });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(result.data).toStrictEqual({
                id: 'Id orden',
                products: [
                    {
                        product: 'Product test',
                        quantity: 2,
                        price: 100,
                        subtotal: 200
                    }
                ],
                total: 200
            });
        }
    });
    (0, vitest_1.test)('Receives a invalid cart id and should generate buy order, and return order', async () => {
        const result = await (0, buy_order_1.genBuyOrder)({
            dependencies: { buyOrderService, cartService },
            payload: { id: 'FAIL' }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Not found');
        }
    });
});
//# sourceMappingURL=buy-order.test.js.map