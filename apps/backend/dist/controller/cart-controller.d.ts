import { Request, Response } from "express";
export declare class CartController {
    static getAllCarts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getCartById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createCart(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static deleteCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static addProductToCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteProductInCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=cart-controller.d.ts.map