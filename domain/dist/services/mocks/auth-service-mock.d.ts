import { IUser } from "../../entities";
import { authenticationService } from "../authentication/auth-service";
import { Response } from "../../utils/index";
import { BaseServiceMock } from "./base-service-mock";
export declare class AuthenticationServiceMock extends BaseServiceMock<IUser> implements authenticationService {
    constructor(initialUsers?: IUser[]);
    findUserByEmail(email: string): Promise<Response<IUser>>;
    validEmail(email: string): Promise<Response<boolean>>;
    validPassword(password: string, existUserInDB: IUser): Promise<Response<IUser>>;
    generateTokenUser(dataUser: Omit<IUser, "password">): Promise<Response<object>>;
}
//# sourceMappingURL=auth-service-mock.d.ts.map