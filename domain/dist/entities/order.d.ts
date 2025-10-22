import { ICart } from './cart';
export interface IOrder extends Omit<ICart, 'id'> {
    id: string;
}
//# sourceMappingURL=order.d.ts.map