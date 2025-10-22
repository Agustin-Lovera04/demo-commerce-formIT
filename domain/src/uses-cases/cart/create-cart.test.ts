import { CartServiceMock } from '../../services/mocks/cart-service-mocks'
import { beforeAll, describe, expect, test } from "vitest";
import { createCart } from './create-cart';

describe('Create cart', ()=> {
    let cartService: CartServiceMock

    beforeAll(()=>{
        cartService = new CartServiceMock()
    })

    test('Create cart and should return the same', async() =>{
        const result = await createCart({
            dependencies: cartService
        })

        expect(result.success).toBe(true)
        if(result.success){
            expect(result.data).toEqual(expect.objectContaining({
                id: expect.any(String),
                products: expect.any(Array),
                total: expect.any(Number)
            }))
        }
    })
})