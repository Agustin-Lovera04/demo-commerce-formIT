import { ICart, IProduct } from "../../entities";
import { Response } from "../../utils";
import { Service } from "../../utils/types/service";

export interface CartService extends Service<ICart>{
    createCart: () => Promise<Response<ICart>>
    addProductToCart: (cid: string, product: IProduct) => Promise<Response<ICart>>
}
