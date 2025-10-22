import { ICart } from "../../entities";
import { Response } from "../../utils";
import { ArgumentsFunctionsCart } from "../../utils/types/arguments-functions-cart";

export async function getCartById({ dependencies, payload }: ArgumentsFunctionsCart): Promise<Response<ICart>> {
    const id = payload?.id
    if (!id) return {success: false, error: 'Missing id'}

    const findCart = await dependencies.findById(id)

    if (!findCart.success) return {success: false, error: findCart.error}
    if (findCart.data === undefined) return {success: false, error: 'Unexpected error in find cart'}

    return {success: true, data: findCart.data}
}