import { beforeAll, describe, expect, test } from "vitest";
import { editProducts } from "./edit-products";
import { ProductsServiceMock } from "../../services/mocks/products-service-mock";
import { IProduct } from "../../entities";
import { productMock } from "../../entities/mocks/product-mock";

describe('Edit Products', () => {
    let productsService: ProductsServiceMock

    beforeAll(() => {
        const mockProducts = [
        productMock(),
        productMock({ id:'prod', title: "Product", price: 1000 }),
        productMock({ price: 1000 }),
        ];
        productsService = new ProductsServiceMock(mockProducts)
    });
    test('Receive product data and should return the updated product', async () => {
        const result = await editProducts({
            dependencies: productsService,
            payload: {
                id: 'prod',
                title: "update Product"
            }
        })

        expect(result.success).toBe(true)
        if(result.success){
            expect(result.data).toHaveProperty('title', 'update Product')
        }
    })

    test('Receive product data with invalid fields and should return an error', async () => {
        const result = await editProducts({
            dependencies: productsService,
            payload: {
                id: 'prod',
                FAIL: "update Product"
            } as unknown as Partial<IProduct>
        })

        expect(result.success).toBe(false)
        if(!result.success){
            expect(result.error).toStrictEqual('Invalid fields')
        }
    })

    test('Receive product data with invalid id and should return an error', async () => {
        const result = await editProducts({
            dependencies: productsService,
            payload: {
                id: 'INVALID ID',
                title: "update Product"
            }
        })

        expect(result.success).toBe(false)
        if(!result.success){
            expect(result.error).toStrictEqual('Not found')
        }
    })

    test('Received invalid data types in product fields and should return an error', async () => {
        const result = await editProducts({
            dependencies: productsService,
            payload: {
                id: 'prod',
                price: 'not a number'
            } as unknown as Partial<IProduct>
        });

        expect(result.success).toBe(false)
        if(!result.success){
            expect(result.error).toStrictEqual('Invalid type for price, expected number')
        }
    });
})