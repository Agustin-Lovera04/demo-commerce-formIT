import { beforeAll, describe, expect, test } from "vitest";
import { ProductsServiceMock } from "../../services/mocks/products-service-mock";
import { CartServiceMock } from "../../services/mocks/cart-service-mocks";
import { deleteProductInCart } from "./delete-product-in-cart";
import { calculateCartTotals } from "../../utils";

describe('Delete product in cart', () => {
    let cartService: CartServiceMock;
    let productService: ProductsServiceMock;
    let services: { cartService: CartServiceMock; productService: ProductsServiceMock };

    beforeAll(() => {
        const rawCart1Products = [
            { product: "Product test", quantity: 2, price: 100, subtotal: 0 },
        ];
        const { products, total } = calculateCartTotals(rawCart1Products);

        cartService = new CartServiceMock([
            { id: "Cart1", products, total },
            { id: "Cart2", products: [], total: 0 },
        ]);

        productService = new ProductsServiceMock([
            { id: 'prod1', title: 'Product 1', price: 1000, stock: true },
            { id: 'stockFalse', title: 'Product 2', price: 1000, stock: false }
        ]);

        services = { cartService, productService };
    });

    test('Receives a cart id and a product id and delete it to the cart, and returns the cart', async () => {
        const result = await deleteProductInCart({
            dependencies: services,
            payload: { cid: 'Cart1', pid: 'prod1' }
        });

        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data).toBe(undefined)
        }
    });

    test('Receives a invalid cart id and a product id and delete it to the cart, and returns the cart', async () => {
        const result = await deleteProductInCart({
            dependencies: services,
            payload: { cid: 'FAIL', pid: 'prod1' }
        });

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('Not found')
        }
    });

    test('Receives a cart id and a invalid product id and delete it to the cart, and returns the cart', async () => {
        const result = await deleteProductInCart({
            dependencies: services,
            payload: { cid: 'Cart1', pid: 'FAIL' }
        });

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('Not found')
        }
    });

})