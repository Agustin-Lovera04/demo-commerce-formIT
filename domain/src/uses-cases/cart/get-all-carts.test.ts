import { beforeAll, describe, expect, test } from "vitest";
import { CartServiceMock } from "../../services/mocks/cart-service-mocks";
import { getCarts } from "./get-all-carts";
import { calculateCartTotals } from "../../utils";

describe('Get All carts', ()=>{
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

    test('Get all carts', async ()=>{
        const result = await getCarts({
            dependencies: cartService
        })

        expect(result.success).toBe(true)
        if(result.success){
            expect(Array.isArray(result.data)).toBe(true)
            expect(result.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(String),
                        products: expect.any(Array)
                    })
                ])
            );
        }
    })
})