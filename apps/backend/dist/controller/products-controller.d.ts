import { Request, Response } from "express";
export declare class ProductsController {
    static getAllProducts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getProductById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static editProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=products-controller.d.ts.map