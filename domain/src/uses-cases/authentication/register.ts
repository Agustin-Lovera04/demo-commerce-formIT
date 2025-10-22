import { IUser, UserRole } from "../../entities"
import { CartService } from "../../services"
import { authenticationService } from "../../services/authentication/auth-service"
import { Response } from "../../utils/types/response"


interface registerUserData {
    dependencies: { authenticationService: authenticationService, cartService: CartService },
    payload: IUser
}

export async function registerUser({ dependencies, payload }: registerUserData): Promise<Response<IUser>> {

    const { email, password } = payload

    let validEmail = await dependencies.authenticationService.validEmail(email)
    if (!validEmail.success) return { success: false, error: validEmail.error }

    if (!password || password.length === 0) return { success: false, error: 'Invalid password' }

    let existUserInDB = await dependencies.authenticationService.findUserByEmail(email)


    if (existUserInDB.success && existUserInDB.data) {
        return { success: false, error: 'User already exists' }
    }

    if (email.toLowerCase() === 'admin@admin.com') {
        payload.role = UserRole.ADMIN;
    }

    const cart = await dependencies.cartService.createCart()
    if(!cart.success) return { success: false, error : cart.error}

    if(cart.data.id){
        payload.cartId = cart.data.id
    }
    const createUser = await dependencies.authenticationService.create(payload)
    if (!createUser.success) {
        return { success: false, error: createUser.error }
    }


    return { success: true, data: createUser.data }
}