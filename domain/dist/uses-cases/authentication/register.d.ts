import { IUser } from "../../entities";
import { CartService } from "../../services";
import { authenticationService } from "../../services/authentication/auth-service";
import { Response } from "../../utils/types/response";
interface registerUserData {
    dependencies: {
        authenticationService: authenticationService;
        cartService: CartService;
    };
    payload: IUser;
}
export declare function registerUser({ dependencies, payload }: registerUserData): Promise<Response<IUser>>;
export {};
//# sourceMappingURL=register.d.ts.map