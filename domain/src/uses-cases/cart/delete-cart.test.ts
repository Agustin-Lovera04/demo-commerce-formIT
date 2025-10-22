import { beforeAll, describe, expect, test } from "vitest";
import { deleteCart } from "./delete-cart";
import { CartServiceMock } from "../../services/mocks/cart-service-mocks";
import { calculateCartTotals } from "../../utils";

describe('Delete cart', () => {
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


    test('Receives the cart id and should delete the cart in the DB and return an exit message', async () => {
        const result = await deleteCart({
            dependencies: cartService,
            payload: { id: 'Cart1' }
        })
        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data).toBe(undefined)
        }
    })

    test('Receives invalid id cart and should delete the cart in the DB and return an exit message', async () => {
        const result = await deleteCart({
            dependencies: cartService,
            payload: { id: 'FAIL' }
        })

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('Not found')
        }
    })
    test('Not receives id cart and should delete the cart in the DB and return an exit message', async () => {
        const result = await deleteCart({
            dependencies: cartService,
        })

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('Missing id')
        }
    })
})