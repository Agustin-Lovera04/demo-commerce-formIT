import { IProduct } from "../../entities";
import { Response } from "../../utils";
import { ArgumentsFunctionsProducts } from "../../utils/types/arguments-functions-products";

export async function editProducts({ dependencies, payload }: ArgumentsFunctionsProducts): Promise<Response<IProduct>> {

    if (!payload) return { success: false, error: 'Product fields are missing to update' }

    const id = payload?.id
    if (!id) return { success: false, error: 'Missing id' }

    const validFields = await dependencies.validFields(payload)
    if (!validFields.success) return { success: false, error: validFields.error }

    const updatedProduct = await dependencies.editOne(id, payload)
    if (!updatedProduct.success) return { success: false, error: updatedProduct.error }

    return { success: true, data: updatedProduct.data }
} 