import { IUser } from "../../entities";
import { authenticationService } from "../authentication/auth-service";
import { Response } from "../../utils/index";
import { BaseServiceMock } from "./base-service-mock";
import { ConfigService } from "../../config";
export declare class AuthenticationServiceMock extends BaseServiceMock<IUser> implements authenticationService {
    private securityService;
    constructor(initialUsers?: IUser[]);
    findUserByEmail(email: string): Promise<Response<IUser>>;
    validEmail(email: string): Promise<Response<boolean>>;
    validPassword(password: string, userPassword: string): Promise<Response<boolean>>;
    generateTokenUser(dataUser: Omit<IUser, "password">, configService: ConfigService): Promise<Response<string>>;
    hashPassword(password: string): Promise<Response<string>>;
}
//# sourceMappingURL=auth-service-mock.d.ts.map