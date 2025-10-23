import { ICart } from './../../entities/cart';
import { ArgumentsFunctionsCart } from "../../utils/types/arguments-functions-cart";
import { Response } from '../../utils';

export async function createCart({ dependencies, payload }: ArgumentsFunctionsCart): Promise<Response<ICart>> {
    try {
        const createCart = await dependencies.createCart()
        if (!createCart.success) return { success: false, error: createCart.error }

        if (createCart.data === undefined || !createCart.data.id || !createCart.data.products) return { success: false, error: 'Unexpected error in create cart' }

        return { success: true, data: createCart.data }
    } catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }
}
