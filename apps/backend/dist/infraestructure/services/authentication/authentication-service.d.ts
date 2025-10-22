import { authenticationService, IUser, Response } from "../../../../../../domain/dist/index.js";
export declare class AuthenticationService implements authenticationService {
    findAll(): Promise<Response<IUser[]>>;
    findById(id: string): Promise<Response<IUser>>;
    findUserByEmail(email: string): Promise<Response<IUser>>;
    create(dataUser: Omit<IUser, "id">): Promise<Response<IUser>>;
    validEmail(email: string): Promise<Response<boolean>>;
    validPassword(password: string, user: IUser): Promise<Response<IUser>>;
    generateTokenUser(dataUser: Omit<IUser, "password">): Promise<Response<string>>;
    editOne(id: string, payload: Partial<IUser>): Promise<Response<IUser>>;
    deleteOne(id: string): Promise<Response<void>>;
}
//# sourceMappingURL=authentication-service.d.ts.map