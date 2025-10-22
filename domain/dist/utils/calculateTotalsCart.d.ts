import { IProductCartItem } from "../entities/index";
export declare function calculateCartTotals(products: IProductCartItem[]): {
    products: {
        subtotal: number;
        product: string;
        quantity: number;
        price: number;
    }[];
    total: number;
};
//# sourceMappingURL=calculateTotalsCart.d.ts.map