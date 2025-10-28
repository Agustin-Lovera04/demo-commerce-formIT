import { Response } from './types';
export interface securityPassword {
    hashPassword(): Promise<Response<string>>;
    comparePassword(): Promise<Response<boolean>>;
}
//# sourceMappingURL=hash-password.d.ts.map