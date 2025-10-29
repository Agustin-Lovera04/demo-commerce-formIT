import { SecurityPassword } from "../../utils";
import { Response } from "../../utils";

export class SecurityPasswordMock implements SecurityPassword {
  async hashPassword(password: string): Promise<Response<string>> {
    return { success: true, data: `hashed_${password}` };
  }

  async comparePassword(password: string, hashedPassword: string): Promise<Response<boolean>> {
   if( (hashedPassword === `hashed_${password}`) === false) return {success: false, error: 'Invalid Credentials'}
    return { success: true, data: true};
  }
}
