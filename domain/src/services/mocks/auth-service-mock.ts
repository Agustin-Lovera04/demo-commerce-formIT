import { IUser } from "../../entities";
import { authenticationService } from "../authentication/auth-service";
import { comparePassword, hashPassword, Response } from "../../utils/index";
import jwt from 'jsonwebtoken';
import { BaseServiceMock } from "./base-service-mock";
import { ConfigService } from "../../config";

export class AuthenticationServiceMock extends BaseServiceMock<IUser> implements authenticationService {
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
        const compare = await comparePassword(password, userPassword)
        if (!compare) {
            return { success: false, error: "Invalid password" };
        }
        return { success: true, data: true };
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
        const hashed = await hashPassword(password)
        if(!hashPassword)return {success:false, error: 'Unexpected error in hash password'}

        return { success: true, data: hashed}
    }
}
