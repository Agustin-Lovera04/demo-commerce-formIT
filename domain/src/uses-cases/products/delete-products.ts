import { Response } from "../../utils";
import { ArgumentsFunctionsProducts } from "../../utils/types/arguments-functions-products";

export async function deleteProducts({ dependencies, payload }: ArgumentsFunctionsProducts): Promise<Response<void>> {
    try {

        if (!payload) return { success: false, error: 'Missing id' }

        const { id } = payload
        if (!id) return { success: false, error: 'Missing id' }

        const deleteProduct = await dependencies.deleteOne(id)
        if (!deleteProduct.success) return { success: false, error: deleteProduct.error }

        return { success: true, data: undefined }
    } catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }
}