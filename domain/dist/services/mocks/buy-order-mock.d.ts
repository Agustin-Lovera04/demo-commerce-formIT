import { ICart } from '../../entities';
import { IOrder } from '../../entities/order';
import { Response } from '../../utils';
import { BuyOrderService } from './../buy-order/buy-order';
import { BaseServiceMock } from './base-service-mock';
export declare class BuyOrderServiceMock extends BaseServiceMock<IOrder> implements BuyOrderService {
    genBuyOrder(cart: ICart): Promise<Response<IOrder>>;
}
//# sourceMappingURL=buy-order-mock.d.ts.map