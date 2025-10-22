import { CartServiceMock } from '../../services/mocks/cart-service-mocks';
import { beforeAll, describe, expect, test } from "vitest";
import { getCartById } from "./get-cart-by-id";
import { calculateCartTotals } from '../../utils';

describe('Get cart by id', () => {
    let cartService: CartServiceMock
    beforeAll(() => {
        const rawCart1Products = [
            { product: "Product test", quantity: 2, price: 100, subtotal: 0 },
        ];
        const { products, total } = calculateCartTotals(rawCart1Products);

        cartService = new CartServiceMock([
            { id: "Cart1", products, total },
            { id: "Cart2", products: [], total: 0 },
        ]);
    });
    test('Receives id cart and should return the cart with this id', async () => {
        const result = await getCartById({
            dependencies: cartService,
            payload: { id: 'Cart1' }
        })

        expect(result.success).toBe(true)
        if(result.success){
            expect(result.data).toStrictEqual(
                {
                    id: 'Cart1',
                    products: [{
                        product: 'Product test',
                        quantity: 2,
                        price:100,
                        subtotal: 200
                    }],
                    total: 200
                }
            )
        }
    })
    test('Receives invalid id cart and should return an error', async () => {
        const result = await getCartById({
            dependencies: cartService,
            payload: { id: 'FAIL' }
        })
        expect(result.success).toBe(false)
        if(!result.success){
            expect(result.error).toStrictEqual('Not found')
        }
    })

    test('Not receives id cart and should return an error', async () => {
        const result = await getCartById({
            dependencies: cartService,
        })
        expect(result.success).toBe(false)
        if(!result.success){
            expect(result.error).toStrictEqual('Missing id')
        }
    })
})