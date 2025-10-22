"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_service_mock_1 = require("../../services/mocks/products-service-mock");
const vitest_1 = require("vitest");
const get_product_by_id_1 = require("./get-product-by-id");
const product_mock_1 = require("../../entities/mocks/product-mock");
(0, vitest_1.describe)('Products module - getProductById', () => {
    let productsService;
    (0, vitest_1.beforeAll)(() => {
        const mockProducts = [
            (0, product_mock_1.productMock)(),
            (0, product_mock_1.productMock)({ id: 'prod', title: "Product", price: 1000 }),
            (0, product_mock_1.productMock)({ price: 1000 }),
        ];
        productsService = new products_service_mock_1.ProductsServiceMock(mockProducts);
    });
    (0, vitest_1.test)('Should return matching product by id', async () => {
        const result = await (0, get_product_by_id_1.getProductById)({
            dependencies: productsService,
            payload: { id: 'prod' }
        });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(result.data).toStrictEqual({
                id: 'prod',
                title: 'Product',
                price: 1000,
                stock: true,
            });
        }
    });
    (0, vitest_1.test)('Should return error for invalid id', async () => {
        const result = await (0, get_product_by_id_1.getProductById)({
            dependencies: productsService,
            payload: { id: 'error' }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Not found');
        }
    });
    (0, vitest_1.test)('Should return "Missing id" if id is not provided', async () => {
        const result = await (0, get_product_by_id_1.getProductById)({
            dependencies: productsService,
            payload: {}
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Missing id');
        }
    });
});
//# sourceMappingURL=get-product-by-Id.test.js.map