import { ICart, IOrder, Response, BuyOrderService } from '../../../../../../domain/dist';
export declare class BuyOrderServiceReal implements BuyOrderService {
    genBuyOrder(cart: ICart): Promise<Response<IOrder>>;
    findAll(): Promise<Response<IOrder[]>>;
    findById(id: string): Promise<Response<IOrder>>;
    create(payload: Omit<IOrder, "id">): Promise<Response<IOrder>>;
    editOne(id: string, payload: Partial<IOrder>): Promise<Response<IOrder>>;
    deleteOne(id: string): Promise<Response<void>>;
}
//# sourceMappingURL=buy-order-service.d.ts.map