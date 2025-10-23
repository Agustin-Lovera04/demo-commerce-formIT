import { IProduct } from "../../entities";
import { ArgumentsFunctionsProducts, Response } from "../../utils/index";

export async function getAllProducts({ dependencies }: ArgumentsFunctionsProducts): Promise<Response<IProduct[]>> {
    try {
        if (!dependencies?.findAll) {
            return { success: false, error: 'Missing dependencies or findAll function' };
        }

        const products = await dependencies.findAll();

        if (!products.success) return { success: false, error: products.error };

        return { success: true, data: products.data ?? [] };
    } catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }
}
