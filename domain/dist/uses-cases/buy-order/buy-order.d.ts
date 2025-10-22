import { IOrder } from './../../entities/order';
import { CartService } from './../../services/cart/cart-service';
import { BuyOrderService } from "../../services/buy-order/buy-order";
import { Response } from '../../utils';
interface ArgumentsFunctionOrder {
    dependencies: {
        buyOrderService: BuyOrderService;
        cartService: CartService;
    };
    payload: {
        id: string;
    };
}
export declare function genBuyOrder({ dependencies, payload }: ArgumentsFunctionOrder): Promise<Response<IOrder>>;
export {};
//# sourceMappingURL=buy-order.d.ts.map