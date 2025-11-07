import { authenticationService, IUser, Response, ConfigService, SecurityPassword } from "../../../../../../domain/dist/index.js";
export declare class AuthenticationService implements authenticationService {
    private passwordService;
    constructor(passwordService: SecurityPassword);
    findAll(): Promise<Response<IUser[]>>;
    findById(id: string): Promise<Response<IUser>>;
    findUserByEmail(email: string): Promise<Response<IUser>>;
    create(dataUser: Omit<IUser, "id">): Promise<Response<IUser>>;
    validEmail(email: string): Promise<Response<boolean>>;
    validPassword(password: string, userPassword: string): Promise<Response<boolean>>;
    hashPassword(password: string): Promise<Response<string>>;
    generateTokenUser(dataUser: Omit<IUser, "password">, configService: ConfigService): Promise<Response<string>>;
    verifyToken(token: string, configService: ConfigService): Promise<Response<IUser>>;
    editOne(id: string, payload: Partial<IUser>): Promise<Response<IUser>>;
    deleteOne(id: string): Promise<Response<void>>;
}
//# sourceMappingURL=authentication-service.d.ts.map