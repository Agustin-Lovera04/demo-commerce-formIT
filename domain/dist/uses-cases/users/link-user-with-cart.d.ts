import { IUser } from "../../entities";
import { CartService } from "../../services/cart/cart-service";
import { UserService } from "../../services/users/users-service";
import { Response } from "../../utils";
interface ArgumentsFunctionsUser {
    dependencies: {
        userService: UserService;
        cartService: CartService;
    };
    payload: {
        id: string;
        cartId: string;
    };
}
export declare function linkUserWithCart({ dependencies, payload }: ArgumentsFunctionsUser): Promise<Response<IUser>>;
export {};
//# sourceMappingURL=link-user-with-cart.d.ts.map