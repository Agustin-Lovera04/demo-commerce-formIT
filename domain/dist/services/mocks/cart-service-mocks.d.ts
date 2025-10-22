import { ICart, IProduct } from "../../entities";
import { Response } from "../../utils";
import { CartService } from "../cart/cart-service";
import { BaseServiceMock } from "./base-service-mock";
export declare class CartServiceMock extends BaseServiceMock<ICart> implements CartService {
    constructor(initialCarts?: ICart[]);
    createCart(): Promise<Response<ICart>>;
    addProductToCart(cid: string, product: IProduct): Promise<Response<ICart>>;
    deleteProductInCart(cid: string, pid: string): Promise<Response<ICart>>;
}
//# sourceMappingURL=cart-service-mocks.d.ts.map