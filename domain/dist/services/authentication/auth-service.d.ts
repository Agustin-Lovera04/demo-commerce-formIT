import { Response } from './../../utils/types/response';
import { IUser } from "../../entities";
import { Service } from "../../utils/index";
export interface authenticationService extends Service<IUser> {
    findUserByEmail: (email: string) => Promise<Response<IUser>>;
    validEmail: (email: string) => Promise<Response<boolean>>;
    hashPassword: (password: string) => Promise<Response<string>>;
    validPassword: (password: string, userPassword: string) => Promise<Response<boolean>>;
    generateTokenUser: (dataUser: Omit<IUser, 'password'>) => Promise<Response<string>>;
}
//# sourceMappingURL=auth-service.d.ts.map