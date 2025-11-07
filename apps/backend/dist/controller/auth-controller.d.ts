import { Request, Response } from "express";
export declare class AuthController {
    static register(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static current(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=auth-controller.d.ts.map