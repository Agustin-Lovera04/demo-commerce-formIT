import { beforeAll, describe, expect, test } from "vitest";
import { getAllProducts } from "./get-all-products";
import { ProductsServiceMock } from "../../services/mocks/products-service-mock";
import { productMock } from "../../entities/mocks/product-mock";

describe('Products module - getAllProducts', () => {
    let productsService: ProductsServiceMock;

    beforeAll(() => {
        const mockProducts = [
            productMock(),
            productMock({ title: "Test Product" }),
            productMock({ price: 1000 }),
        ];
        productsService = new ProductsServiceMock(mockProducts);
    });

    test('Should list all products', async () => {
        const result = await getAllProducts({ dependencies: productsService });

        expect(result.success).toBe(true)
        if (result.success) {
            expect(Array.isArray(result.data)).toBe(true);
            expect(result.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(String),
                        title: expect.any(String),
                        price: expect.any(Number),
                        stock: expect.any(Boolean),
                    }),
                ])
            );
        }
    });

    test('Should return empty array if no products exist', async () => {
        const emptyService = new ProductsServiceMock([]);
        const result = await getAllProducts({ dependencies: emptyService });

        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data).toStrictEqual([]);
        }
    });
});
