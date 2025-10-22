import { IUser } from "../../entities"
import { CartService } from "../../services/cart/cart-service"
import { UserService } from "../../services/users/users-service"
import { Response } from "../../utils"

interface ArgumentsFunctionsUser {
    dependencies: {
        userService: UserService,
        cartService: CartService
    },
    payload: {
        id: string,
        cartId: string
    }
}
export async function linkUserWithCart({dependencies, payload}: ArgumentsFunctionsUser): Promise<Response<IUser>>{
    const {userService, cartService} = dependencies
    const {id, cartId} = payload
    if(!id || !cartId) return {success: false, error:'Missing fields'}

    const existCart = await cartService.findById(cartId)
    if(!existCart.success) return {success: false, error:existCart.error}

    const existUser = await userService.findById(id)
    if(!existUser.success) return {success: false, error:existUser.error}

    const editUser = await userService.editOne(id, {cartId})
    if(!editUser.success) return {success: false, error:editUser.error}

    return {success: true, data:editUser.data}
}