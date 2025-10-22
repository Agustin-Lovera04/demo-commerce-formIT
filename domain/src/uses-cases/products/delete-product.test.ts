import { beforeAll, describe, expect, test } from "vitest";
import { ProductsServiceMock } from "../../services/mocks/products-service-mock";
import { productMock } from "../../entities/mocks/product-mock";
import { deleteProducts } from "./delete-products";

describe('Delete product', () => {
    let productsService: ProductsServiceMock

    beforeAll(() => {
        const mockProducts = [
            productMock(),
            productMock({}),
            productMock({ price: 1000 }),
            productMock({ id: 'Product test', title: "Product", price: 1000 }),
            productMock({}),
        ];
        productsService = new ProductsServiceMock(mockProducts)
    });

    test('Receives a product id and should delete it from persistence', async () => {
        const result = await deleteProducts({
            dependencies: productsService,
            payload: { id: 'Product test' }
        })

        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data).toBe(undefined)
        }
    })

    test('Not Receives a product id and should return an error', async () => {
        const result = await deleteProducts({
            dependencies: productsService,
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('Missing id')
        }
    })

    test('Receives a invalid product id and should return an error', async () => {
        const result = await deleteProducts({
            dependencies: productsService,
            payload: { id: 'FAIL' }
        })

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('Not found')
        }
    })

    test('Received id of a product already deleted and should return Not found product', async () => {
        const result = await deleteProducts({
            dependencies: productsService,
            payload: { id: 'Product test' }
        })

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('Not found')
        }
    })
})