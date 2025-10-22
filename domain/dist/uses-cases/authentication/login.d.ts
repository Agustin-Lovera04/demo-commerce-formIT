import { IUser } from "../../entities";
import { authenticationService } from "../../services/authentication/auth-service";
import { Response } from "../../utils";
type loginFields = 'email' | 'password';
type loginData = Pick<IUser, loginFields>;
interface loginUserData {
    dependencies: {
        authenticationService: authenticationService;
    };
    payload: loginData;
}
export declare function loginUser({ dependencies, payload }: loginUserData): Promise<Response<string>>;
export {};
//# sourceMappingURL=login.d.ts.map