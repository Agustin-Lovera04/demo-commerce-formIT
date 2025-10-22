import { IProduct } from "../../entities";
import { Response } from "../../utils/index";
import { ProductsService } from "../products/products-service";
import { BaseServiceMock } from "./base-service-mock";
export declare class ProductsServiceMock extends BaseServiceMock<IProduct> implements ProductsService {
    constructor(initialProducts?: IProduct[]);
    validFields(payload: object): Promise<Response<boolean>>;
    findProductByTitle(title: string): Promise<Response<boolean>>;
}
//# sourceMappingURL=products-service-mock.d.ts.map