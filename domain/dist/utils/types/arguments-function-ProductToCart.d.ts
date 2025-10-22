import { ProductsService } from "../../services/products/products-service";
import { CartService } from "../../services/cart/cart-service";
export interface ArgumentsProductToCart {
    dependencies: {
        cartService: CartService;
        productService: ProductsService;
    };
    payload: {
        cid: string;
        pid: string;
    };
}
//# sourceMappingURL=arguments-function-ProductToCart.d.ts.map