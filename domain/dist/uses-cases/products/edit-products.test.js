"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const edit_products_1 = require("./edit-products");
const products_service_mock_1 = require("../../services/mocks/products-service-mock");
const product_mock_1 = require("../../entities/mocks/product-mock");
(0, vitest_1.describe)('Edit Products', () => {
    let productsService;
    (0, vitest_1.beforeAll)(() => {
        const mockProducts = [
            (0, product_mock_1.productMock)(),
            (0, product_mock_1.productMock)({ id: 'prod', title: "Product", price: 1000 }),
            (0, product_mock_1.productMock)({ price: 1000 }),
        ];
        productsService = new products_service_mock_1.ProductsServiceMock(mockProducts);
    });
    (0, vitest_1.test)('Receive product data and should return the updated product', async () => {
        const result = await (0, edit_products_1.editProducts)({
            dependencies: productsService,
            payload: {
                id: 'prod',
                title: "update Product"
            }
        });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(result.data).toHaveProperty('title', 'update Product');
        }
    });
    (0, vitest_1.test)('Receive product data with invalid fields and should return an error', async () => {
        const result = await (0, edit_products_1.editProducts)({
            dependencies: productsService,
            payload: {
                id: 'prod',
                FAIL: "update Product"
            }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Invalid fields');
        }
    });
    (0, vitest_1.test)('Receive product data with invalid id and should return an error', async () => {
        const result = await (0, edit_products_1.editProducts)({
            dependencies: productsService,
            payload: {
                id: 'INVALID ID',
                title: "update Product"
            }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Not found');
        }
    });
    (0, vitest_1.test)('Received invalid data types in product fields and should return an error', async () => {
        const result = await (0, edit_products_1.editProducts)({
            dependencies: productsService,
            payload: {
                id: 'prod',
                price: 'not a number'
            }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Invalid type for price, expected number');
        }
    });
});
//# sourceMappingURL=edit-products.test.js.map