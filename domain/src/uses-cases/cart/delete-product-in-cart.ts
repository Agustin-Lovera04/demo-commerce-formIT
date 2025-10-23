import { Response } from '../../utils';
import { ArgumentsProductToCart } from '../../utils/types/arguments-function-ProductToCart';
export async function deleteProductInCart({ dependencies, payload }: ArgumentsProductToCart): Promise<Response<void>> {
    try {

        const { cartService, productService } = dependencies
        const { cid, pid } = payload
        if (!cid || !pid) return { success: false, error: 'Missing Cart id or Product Id' }

        const existCart = await cartService.findById(cid)
        if (!existCart.success) return { success: false, error: existCart.error }

        const existProduct = await productService.findById(pid)
        if (!existProduct.success) return { success: false, error: existProduct.error }
       
        const deleteProductInCart = await cartService.deleteProductInCart(cid, pid)
        if (!deleteProductInCart.success) return { success: false, error: deleteProductInCart.error }

        if (deleteProductInCart.data === undefined) return { success: false, error: 'Unexpected error in delete product to cart' }

        return { success: true, data: undefined }
    } catch (error) {
        return {
            success: false,
            error: 'Internal server error'
        };
    }

}