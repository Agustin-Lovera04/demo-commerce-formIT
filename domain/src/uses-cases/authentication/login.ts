import { ConfigService } from "../../config";
import { IUser } from "../../entities";
import { authenticationService } from "../../services/authentication/auth-service";
import { Response } from "../../utils";

type loginFields = 'email' | 'password';

type loginData = Pick<IUser, loginFields>

interface loginUserData {
    dependencies: { authenticationService: authenticationService, configService: ConfigService },
    payload: loginData
}

export async function loginUser({ dependencies, payload }: loginUserData): Promise<Response<string>> {
    try {
        const { email, password } = payload

        let valid = await dependencies.authenticationService.validEmail(email)
        if (!valid.success) return { success: false, error: valid.error }

        let existUserInDB = await dependencies.authenticationService.findUserByEmail(email)
        if (!existUserInDB.success || existUserInDB.data == undefined) {
            return { success: false, error: 'Invalid credentials' }
        }

        let validPassword = await dependencies.authenticationService.validPassword(password, existUserInDB.data.password)
        if (!validPassword.success) {
            return { success: false, error: 'Invalid credentials' }
        }

        const userSafeField: Omit<IUser, 'password'> = existUserInDB.data

        const token = await dependencies.authenticationService.generateTokenUser(userSafeField, dependencies.configService)
        if (!token.success || token.data == undefined) {
            return { success: false, error: 'Internal error in login process' }
        }

        return { success: true, data: token.data }
    } catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }
}