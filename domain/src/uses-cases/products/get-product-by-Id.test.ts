import { ProductsServiceMock } from '../../services/mocks/products-service-mock';
import { beforeAll, describe, expect, test } from "vitest";
import { getProductById } from "./get-product-by-id";
import { productMock } from '../../entities/mocks/product-mock';

describe('Products module - getProductById', () => {
    let productsService: ProductsServiceMock;

    beforeAll(() => {
        const mockProducts = [
            productMock(),
            productMock({ id: 'prod', title: "Product", price: 1000 }),
            productMock({ price: 1000 }),
        ];
        productsService = new ProductsServiceMock(mockProducts);
    });

    test('Should return matching product by id', async () => {
        const result = await getProductById({
            dependencies: productsService,
            payload: { id: 'prod' }
        });

        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data).toStrictEqual({
                id: 'prod',
                title: 'Product',
                price: 1000,
                stock: true,
            })
        }

    });

    test('Should return error for invalid id', async () => {
        const result = await getProductById({
            dependencies: productsService,
            payload: { id: 'error' }
        });

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('Not found');
        }
    });

    test('Should return "Missing id" if id is not provided', async () => {
        const result = await getProductById({
            dependencies: productsService,
            payload: {}
        });

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('Missing id');
        }
    });
});
