import { IUser } from "../../entities";
import { authenticationService } from "../authentication/auth-service";
import { Response } from "../../utils/index";
import jwt from 'jsonwebtoken';
import { BaseServiceMock } from "./base-service-mock";
import { ConfigService } from "../../config";
import { SecurityPasswordMock } from "./security-password-mock";

export class AuthenticationServiceMock extends BaseServiceMock<IUser> implements authenticationService {
    private securityService = new SecurityPasswordMock()
    constructor(initialUsers: IUser[] = []) {
        super(initialUsers)
    }
    async findUserByEmail(email: string): Promise<Response<IUser>> {
        const user = this.items.find(u => u.email === email);
        if (!user) {
            return { success: false, error: 'User not found' };
        }
        return { success: true, data: user };
    }

    async validEmail(email: string): Promise<Response<boolean>> {
        let exReg = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        let valid = exReg.test(email);
        if (!valid) return { success: false, error: 'Invalid email' };
        return { success: true, data: true };
    }


    async validPassword(password: string, userPassword: string): Promise<Response<boolean>> {
        const compare = await this.securityService.comparePassword(password, userPassword)
        if (!compare.success) {
            return { success: false, error: compare.error };
        }
        return { success: true, data: compare.data };
    }

    async generateTokenUser(dataUser: Omit<IUser, "password">, configService: ConfigService): Promise<Response<string>> {
        const secret_JWT_KEY = await configService.getSecretKeyJWT()
        if(!secret_JWT_KEY.success)return {success: false, error: secret_JWT_KEY.error}
        
        const token = jwt.sign(
            dataUser,
            secret_JWT_KEY.data,
            { expiresIn: '1h' }
        );
        return { success: true, data: token };
    }

    async hashPassword(password: string): Promise<Response<string>>{
        const hashed = await this.securityService.hashPassword(password)
        if(!hashed.success)return {success:false, error: hashed.error}

        return { success: true, data: hashed.data}
    }
}
