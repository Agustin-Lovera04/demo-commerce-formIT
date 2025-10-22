"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const products_service_mock_1 = require("../../services/mocks/products-service-mock");
const product_mock_1 = require("../../entities/mocks/product-mock");
const delete_products_1 = require("./delete-products");
(0, vitest_1.describe)('Delete product', () => {
    let productsService;
    (0, vitest_1.beforeAll)(() => {
        const mockProducts = [
            (0, product_mock_1.productMock)(),
            (0, product_mock_1.productMock)({}),
            (0, product_mock_1.productMock)({ price: 1000 }),
            (0, product_mock_1.productMock)({ id: 'Product test', title: "Product", price: 1000 }),
            (0, product_mock_1.productMock)({}),
        ];
        productsService = new products_service_mock_1.ProductsServiceMock(mockProducts);
    });
    (0, vitest_1.test)('Receives a product id and should delete it from persistence', async () => {
        const result = await (0, delete_products_1.deleteProducts)({
            dependencies: productsService,
            payload: { id: 'Product test' }
        });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(result.data).toBe(undefined);
        }
    });
    (0, vitest_1.test)('Not Receives a product id and should return an error', async () => {
        const result = await (0, delete_products_1.deleteProducts)({
            dependencies: productsService,
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Missing id');
        }
    });
    (0, vitest_1.test)('Receives a invalid product id and should return an error', async () => {
        const result = await (0, delete_products_1.deleteProducts)({
            dependencies: productsService,
            payload: { id: 'FAIL' }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Not found');
        }
    });
    (0, vitest_1.test)('Received id of a product already deleted and should return Not found product', async () => {
        const result = await (0, delete_products_1.deleteProducts)({
            dependencies: productsService,
            payload: { id: 'Product test' }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Not found');
        }
    });
});
//# sourceMappingURL=delete-product.test.js.map