import { IUser } from "../../entities";
import { authenticationService } from "../../services/authentication/auth-service";
import { Response } from "../../utils/types/response";
interface registerUserData {
    dependencies: {
        authenticationService: authenticationService;
    };
    payload: IUser;
}
export declare function registerUser({ dependencies, payload }: registerUserData): Promise<Response<IUser>>;
export {};
//# sourceMappingURL=register.d.ts.map