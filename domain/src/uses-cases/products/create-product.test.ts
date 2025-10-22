import { beforeAll, describe, expect, test } from "vitest";
import { ProductsServiceMock } from "../../services/mocks/products-service-mock";
import { createProduct } from "./create-product";
import { IProduct } from "../../entities";
import { productMock } from "../../entities/mocks/product-mock";

describe('Create Product', () => {
    let productsService: ProductsServiceMock

    beforeAll(() => {
        const mockProducts = [
            productMock(),
            productMock({ title: "Product", price: 1000 }),
            productMock({ price: 1000 }),
        ];
        productsService = new ProductsServiceMock(mockProducts)
    });

    test('Receive product data and create the product in persistence', async () => {
        const result = await createProduct({
            dependencies: productsService,
            payload: {
                title: 'Product created',
                price: 900,
                stock: true
            }
        })
        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data).toHaveProperty('title', 'Product created')
            expect(result.data).toHaveProperty('price', 900)
            expect(result.data).toHaveProperty('stock', true)
        }
    })

    test('Receive invalid product data and should return an error', async () => {
        const result = await createProduct({
            dependencies: productsService,
            payload: {
                title: 'Product created',
                price: 'string',
                stock: true
            } as unknown as Partial<IProduct>
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('Invalid field types')
        }
    })

    test('Receive incomplete product data and should return an error', async () => {
        const result = await createProduct({
            dependencies: productsService,
            payload: {
                title: 'Product created',
            } as unknown as Partial<IProduct>
        })

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('Missing fields')
        }
    })

    test('Receive product data and create the product in persistence', async () => {
        const result = await createProduct({
            dependencies: productsService,
            payload: {
                title: 'Product created',
                price: 900,
                stock: true
            }
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('Found product')
        }
    })
})