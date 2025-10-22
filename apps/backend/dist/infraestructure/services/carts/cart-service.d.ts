import { Response, ICart, IProduct, CartService } from "../../../../../../domain/dist/index";
export declare class CartServiceReal implements CartService {
    create(): Promise<Response<ICart>>;
    createCart(): Promise<Response<ICart>>;
    findById(id: string): Promise<Response<ICart>>;
    editOne(id: string, payload: Partial<ICart>): Promise<Response<ICart>>;
    findAll(): Promise<Response<ICart[]>>;
    deleteOne(id: string): Promise<Response<void>>;
    addProductToCart(cid: string, product: IProduct): Promise<Response<ICart>>;
    deleteProductInCart(cid: string, pid: string): Promise<Response<ICart>>;
}
//# sourceMappingURL=cart-service.d.ts.map