import { IProduct } from "../../entities";
import { Service } from "../../utils/types/service";
import { Response } from "../../utils/types\/response";

export interface ProductsService extends Service<IProduct> { 
    validFields: (payload: object) => Promise<Response<boolean>>
    findProductByTitle: (title: string) => Promise<Response<boolean>>
}