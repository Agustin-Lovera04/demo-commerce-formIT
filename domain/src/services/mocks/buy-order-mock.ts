import { ICart } from '../../entities';
import { IOrder } from '../../entities/order';
import { Response } from '../../utils';
import { BuyOrderService } from './../buy-order/buy-order';
import { BaseServiceMock } from './base-service-mock';

export class BuyOrderServiceMock extends BaseServiceMock<IOrder> implements BuyOrderService{

    async genBuyOrder(cart: ICart):Promise<Response<IOrder>>{
        const { id, ...cartOrderFields } = cart;

        const order: IOrder = {
            id: 'Id orden',
            ...cartOrderFields
        
        }
        return {success: true, data: order}
    }
}