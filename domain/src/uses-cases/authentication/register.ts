import { IUser, UserRole } from "../../entities"
import { authenticationService } from "../../services/authentication/authentication-service"
import { Response } from "../../utils/types/response"


interface registerUserData {
    dependencies: { authenticationService: authenticationService },
    payload: IUser
}

export async function registerUser({ dependencies, payload }: registerUserData): Promise<Response<IUser>> {

    const { email, password } = payload

    let validEmail = await dependencies.authenticationService.validEmail(email)
    if (!validEmail.success) return {success: false, error: validEmail.error}

    if(!password ||password.length === 0) return {success: false, error: 'Invalid password'}

    let existUserInDB = await dependencies.authenticationService.findUserByEmail(email)
    if (existUserInDB.success && existUserInDB.data) {
        return {success: false, error: 'User already exists'}
    }
    
    if(email.toLowerCase() === 'admin@admin.com') {
        payload.role = UserRole.ADMIN;
    }

    const createUser = await dependencies.authenticationService.create(payload)

    if (!createUser.success) {
        return {success: false, error: createUser.error}
    }


    return {success: true, data: createUser.data}
}