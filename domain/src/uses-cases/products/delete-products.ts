import { IProduct } from "../../entities";
import { Response } from "../../utils";
import { ArgumentsFunctionsProducts } from "../../utils/types/arguments-functions-products";

export async function deleteProducts({ dependencies, payload }: ArgumentsFunctionsProducts): Promise<Response<void>> {
    if (!payload) return { success: false, error: 'Missing id' }

    const { id } = payload
    if (!id) return { success: false, error: 'Missing id' }

    const deleteProduct = await dependencies.deleteOne(id)
    if (!deleteProduct.success) return { success: false, error: deleteProduct.error }

    return { success: true, data: undefined }
}