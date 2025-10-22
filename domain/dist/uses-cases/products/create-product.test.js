"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const products_service_mock_1 = require("../../services/mocks/products-service-mock");
const create_product_1 = require("./create-product");
const product_mock_1 = require("../../entities/mocks/product-mock");
(0, vitest_1.describe)('Create Product', () => {
    let productsService;
    (0, vitest_1.beforeAll)(() => {
        const mockProducts = [
            (0, product_mock_1.productMock)(),
            (0, product_mock_1.productMock)({ title: "Product", price: 1000 }),
            (0, product_mock_1.productMock)({ price: 1000 }),
        ];
        productsService = new products_service_mock_1.ProductsServiceMock(mockProducts);
    });
    (0, vitest_1.test)('Receive product data and create the product in persistence', async () => {
        const result = await (0, create_product_1.createProduct)({
            dependencies: productsService,
            payload: {
                title: 'Product created',
                price: 900,
                stock: true
            }
        });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(result.data).toHaveProperty('title', 'Product created');
            (0, vitest_1.expect)(result.data).toHaveProperty('price', 900);
            (0, vitest_1.expect)(result.data).toHaveProperty('stock', true);
        }
    });
    (0, vitest_1.test)('Receive invalid product data and should return an error', async () => {
        const result = await (0, create_product_1.createProduct)({
            dependencies: productsService,
            payload: {
                title: 'Product created',
                price: 'string',
                stock: true
            }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Invalid field types');
        }
    });
    (0, vitest_1.test)('Receive incomplete product data and should return an error', async () => {
        const result = await (0, create_product_1.createProduct)({
            dependencies: productsService,
            payload: {
                title: 'Product created',
            }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Missing fields');
        }
    });
    (0, vitest_1.test)('Receive product data and create the product in persistence', async () => {
        const result = await (0, create_product_1.createProduct)({
            dependencies: productsService,
            payload: {
                title: 'Product created',
                price: 900,
                stock: true
            }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Found product');
        }
    });
});
//# sourceMappingURL=create-product.test.js.map