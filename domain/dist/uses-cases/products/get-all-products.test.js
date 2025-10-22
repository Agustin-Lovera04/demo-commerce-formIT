"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const get_all_products_1 = require("./get-all-products");
const products_service_mock_1 = require("../../services/mocks/products-service-mock");
const product_mock_1 = require("../../entities/mocks/product-mock");
(0, vitest_1.describe)('Products module - getAllProducts', () => {
    let productsService;
    (0, vitest_1.beforeAll)(() => {
        const mockProducts = [
            (0, product_mock_1.productMock)(),
            (0, product_mock_1.productMock)({ title: "Test Product" }),
            (0, product_mock_1.productMock)({ price: 1000 }),
        ];
        productsService = new products_service_mock_1.ProductsServiceMock(mockProducts);
    });
    (0, vitest_1.test)('Should list all products', async () => {
        const result = await (0, get_all_products_1.getAllProducts)({ dependencies: productsService });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(Array.isArray(result.data)).toBe(true);
            (0, vitest_1.expect)(result.data).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    id: vitest_1.expect.any(String),
                    title: vitest_1.expect.any(String),
                    price: vitest_1.expect.any(Number),
                    stock: vitest_1.expect.any(Boolean),
                }),
            ]));
        }
    });
    (0, vitest_1.test)('Should return empty array if no products exist', async () => {
        const emptyService = new products_service_mock_1.ProductsServiceMock([]);
        const result = await (0, get_all_products_1.getAllProducts)({ dependencies: emptyService });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(result.data).toStrictEqual([]);
        }
    });
});
//# sourceMappingURL=get-all-products.test.js.map