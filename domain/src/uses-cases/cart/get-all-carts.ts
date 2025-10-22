import { ArgumentsFunctionsCart, Response } from "../..//utils/index";
import { ICart } from "../../entities";

export async function getCarts({dependencies, payload}: ArgumentsFunctionsCart):Promise<Response<ICart[]>>{
    const getCarts = await dependencies.findAll()
    if(!getCarts.success) return {success: false, error: getCarts.error}

    return {success: true, data: getCarts.data}
}