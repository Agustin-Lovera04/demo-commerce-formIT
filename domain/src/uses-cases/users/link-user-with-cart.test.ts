import { CartServiceMock } from './../../services/mocks/cart-service-mocks';
import { beforeAll, describe, expect, test } from "vitest";
import { linkUserWithCart } from "./link-user-with-cart";
import { UserServiceMock } from "../../services/mocks/user-service-mocks";
import { UserRole } from "../../entities";
import { calculateCartTotals } from '../../utils';

describe('Link cart with user', () => {
    let userService: UserServiceMock
    let cartService: CartServiceMock
    let services: { userService: UserServiceMock; cartService: CartServiceMock };


    beforeAll(() => {
        userService = new UserServiceMock([
            {
                id: 'User1',
                name: 'Agustin',
                email: 'agustin@gmail.com',
                password: 'passTest',
                role: UserRole.CLIENT
            }
        ])

        const rawCart1Products = [
            { product: "Product test", quantity: 2, price: 100, subtotal: 0 },
        ];
        const { products, total } = calculateCartTotals(rawCart1Products);

        cartService = new CartServiceMock([
            { id: "Cart1", products, total },
            { id: "Cart2", products: [], total: 0 },
        ]);

        services = { userService, cartService };
    })

    test('Receive user ID and cart ID to link, it should return the edited user', async () => {
        const result = await linkUserWithCart({
            dependencies: services,
            payload: {
                id: 'User1',
                cartId: 'Cart1'
            }
        })
        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data).toHaveProperty('cartId', 'Cart1')
        }
    })

    test('Receive user ID and invalid cart ID to link, it should return the edited user', async () => {
        const result = await linkUserWithCart({
            dependencies: services,
            payload: {
                id: 'User1',
                cartId: 'FAIL'
            }
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('Not found')
        }
    })
    test('Receive invalid user ID and cart ID to link, it should return the edited user', async () => {
        const result = await linkUserWithCart({
            dependencies: services,
            payload: {
                id: 'FAIL',
                cartId: 'Cart1'
            }
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('Not found')
        }
    })
})