import { IUser } from "../../entities";
import { authenticationService } from "../authentication/auth-service";
import { Response } from "../../utils/index";
import jwt from 'jsonwebtoken';
import { BaseServiceMock } from "./base-service-mock";
import { config } from "../../config/config";

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


    async validPassword(password: string, existUserInDB: IUser): Promise<Response<IUser>> {
        if (password !== existUserInDB.password) {
            return { success: false, error: "Invalid password" };
        }
        return { success: true, data: existUserInDB };
    }

    async generateTokenUser(dataUser: Omit<IUser, "password">): Promise<Response<object>> {
        const token = jwt.sign(
            dataUser,
            config.SECRET_KEY_JWT!,
            { expiresIn: '1h' }
        );
        return { success: true, data: {token} };
    }
}
