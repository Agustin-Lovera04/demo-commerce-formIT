import { IProduct } from '../../entities/product';
import { Response } from '../../utils';
import { ArgumentsFunctionsProducts } from '../../utils/types/arguments-functions-products';

type ProductFields = Pick<IProduct, 'title' | 'price' | 'stock'>;

export async function createProduct({ dependencies, payload }: ArgumentsFunctionsProducts): Promise<Response<IProduct>> {

    if(!payload) return {success: false, error:'Missing fields'}

    const { title, price, stock } = payload as ProductFields;

    if (!title || !price || !stock) {
        return {success: false, error: 'Missing fields'};
    }

    if (typeof title !== 'string' || typeof price !== 'number' || typeof stock !== 'boolean') {
        return {success: false, error:'Invalid field types'};
    }

    const findProductByTitle = await dependencies.findProductByTitle(title)
    if(findProductByTitle.success && findProductByTitle.data === true) return {success: false, error: 'Found product'}

    const newProduct: Omit<IProduct, 'id'> = {title, price, stock}
    
    const create = await dependencies.create(newProduct)

    if(!create.success) return {success: false, error: create.error}
    
    return {success: true, data: create.data};
}
