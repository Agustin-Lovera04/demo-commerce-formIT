import { IOrder } from './../../entities/order';
import { CartService } from './../../services/cart/cart-service';
import { BuyOrderService } from "../../services/buy-order/buy-order"
import { Response } from '../../utils';

interface ArgumentsFunctionOrder {
    dependencies: {
        buyOrderService: BuyOrderService,
        cartService: CartService
    },
    payload: { id: string }
}
export async function genBuyOrder({ dependencies, payload }: ArgumentsFunctionOrder): Promise<Response<IOrder>> {
    const { buyOrderService, cartService } = dependencies
    const { id } = payload
    if (!id) return { success: false, error: 'Missing id' }

    const existCart = await cartService.findById(id)
    if (!existCart.success) return { success: false, error: existCart.error }

    if (existCart.data === undefined) return { success: false, error: 'Unexpected error in get Cart' }

    const order = await buyOrderService.genBuyOrder(existCart.data)
    if (!order.success) return { success: false, error: order.error }

    if (order.data === undefined) return { success: false, error: 'Unexpected error in generate buy order' }

    const cleanCart = await cartService.editOne(id, { products: [] })
    if (!cleanCart.success) return { success: false, error: cleanCart.error }

    return { success: true, data: order.data }
}