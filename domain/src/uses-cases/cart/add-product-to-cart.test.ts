import { beforeAll, describe, expect, test } from "vitest";
import { CartServiceMock } from "../../services/mocks/cart-service-mocks";
import { addProductToCart } from "./add-product-to-cart";
import { ProductsServiceMock } from "../../services/mocks/products-service-mock";
import { calculateCartTotals } from "../../utils";

describe('Add product to cart', () => {
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

    test('Receives a cart id and a product id and adds it to the cart, and returns the cart', async () => {
        const result = await addProductToCart({
            dependencies: services,
            payload: { cid: 'Cart1', pid: 'prod1' }
        });

        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data).toBe(undefined)
        }
    });

    test('Receives a invalid cart id and a product id and should return an error', async () => {
        const result = await addProductToCart({
            dependencies: services,
            payload: { cid: 'FAIL', pid: 'prod1' }
        });

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual("Not found")
        }
    });

    test('Receives a invalid product id and a product id and should return an error', async () => {
        const result = await addProductToCart({
            dependencies: services,
            payload: { cid: 'Cart1', pid: 'FAIL' }
        });
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual("Not found")
        }

    });

    test('Receives a product id with out of stock and a product id and should return an error', async () => {
        const result = await addProductToCart({
            dependencies: services,
            payload: { cid: 'Cart1', pid: 'stockFalse' }
        });
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual("Out of stock")
        }
    });


});
