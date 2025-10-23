import { Response } from "../../utils";
import { ArgumentsFunctionsCart } from "../../utils/types/arguments-functions-cart";

export async function deleteCart({ dependencies, payload }: ArgumentsFunctionsCart): Promise<Response<void>> {
    try {

        const id = payload?.id
        if (!id) return { success: false, error: 'Missing id' }

        const deleteCart = await dependencies.deleteOne(id)
        if (!deleteCart.success) return { success: false, error: deleteCart.error }

        return { success: true, data: undefined }
    } catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }
}