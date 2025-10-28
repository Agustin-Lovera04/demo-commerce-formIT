import { SecurityPassword } from "../../utils";
import { Response } from "../../utils";
export declare class SecurityPasswordMock implements SecurityPassword {
    hashPassword(password: string): Promise<Response<string>>;
    comparePassword(password: string, hashedPassword: string): Promise<Response<boolean>>;
}
//# sourceMappingURL=security-password-mock.d.ts.map