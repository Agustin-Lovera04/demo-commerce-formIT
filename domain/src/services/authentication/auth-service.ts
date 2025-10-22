import { Response } from './../../utils/types/response';
import { IUser } from "../../entities";
import { Service } from "../../utils/index";

export interface authenticationService extends Service<IUser>{
    findUserByEmail: (email: string) => Promise<Response<IUser>>
    validEmail: (email: string) => Promise<Response<boolean>>
    validPassword: (password: string, user: IUser) => Promise<Response<IUser>>
    generateTokenUser: (dataUser: Omit<IUser, 'password'>) => Promise<Response<string>>
}
