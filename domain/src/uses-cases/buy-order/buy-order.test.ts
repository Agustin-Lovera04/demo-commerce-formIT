import { CartServiceMock } from './../../services/mocks/cart-service-mocks';
import { beforeAll, describe, expect, test } from "vitest";
import { BuyOrderServiceMock } from "../../services/mocks/buy-order-mock";
import { genBuyOrder } from "./buy-order";
import { calculateCartTotals } from '../../utils';

describe('Buy order generate', () => {
    let buyOrderService: BuyOrderServiceMock;
    let cartService: CartServiceMock
    let services: { buyOrderService: BuyOrderServiceMock, cartService: CartServiceMock }

    beforeAll(() => {
        buyOrderService = new BuyOrderServiceMock()
        const rawCart1Products = [
            { product: "Product test", quantity: 2, price: 100, subtotal: 0 },
        ];
        const { products, total } = calculateCartTotals(rawCart1Products);

        cartService = new CartServiceMock([
            { id: "Cart1", products, total },
            { id: "Cart2", products: [], total: 0 },
        ]);
        services = { buyOrderService, cartService }
    })

    test('Receives a cart id and should generate buy order, and return order', async () => {
        const result = await genBuyOrder({
            dependencies: { buyOrderService, cartService },
            payload: { id: 'Cart1' }
        })
        expect(result.success).toBe(true)
        if (result.success) {

            expect(result.data).toStrictEqual(
                {
                    id: 'Id orden',
                    products: [
                        {
                            product: 'Product test',
                            quantity: 2,
                            price: 100,
                            subtotal: 200
                        }
                    ],
                    total: 200
                }
            )
        }
    })

    test('Receives a invalid cart id and should generate buy order, and return order', async () => {
        const result = await genBuyOrder({
            dependencies: { buyOrderService, cartService },
            payload: { id: 'FAIL' }
        })
        expect(result.success).toBe(false)
        if (!result.success) {

            expect(result.error).toStrictEqual('Not found')
        }
    })
})