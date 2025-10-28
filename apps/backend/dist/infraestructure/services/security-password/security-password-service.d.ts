import { SecurityPassword, Response } from "../../../../../../domain/dist";
export declare class SecurityPasswordImpl implements SecurityPassword {
    hashPassword(password: string): Promise<Response<string>>;
    comparePassword(password: string, hashedPassword: string): Promise<Response<boolean>>;
}
//# sourceMappingURL=security-password-service.d.ts.map