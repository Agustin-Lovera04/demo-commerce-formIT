import { Response } from './types';
export interface SecurityPassword {
    hashPassword(password: string): Promise<Response<string>>;
    comparePassword(password: string, hashedPassword: string): Promise<Response<boolean>>;
}
//# sourceMappingURL=security-password.d.ts.map