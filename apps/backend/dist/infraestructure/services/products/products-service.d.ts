import { ProductsService, IProduct, Response } from "../../../../../../domain/dist/index.js";
export declare class ProductsServiceReal implements ProductsService {
    findAll(): Promise<Response<IProduct[]>>;
    findById(id: string): Promise<Response<IProduct>>;
    create(dataUser: Omit<IProduct, "id">): Promise<Response<IProduct>>;
    editOne(id: string, payload: Partial<IProduct>): Promise<Response<IProduct>>;
    deleteOne(id: string): Promise<Response<void>>;
    validFields(payload: object): Promise<Response<boolean>>;
    findProductByTitle(title: string): Promise<Response<boolean>>;
}
//# sourceMappingURL=products-service.d.ts.map