import { SecurityPassword } from "../../utils";
import { Response } from "../../utils";

export class SecurityPasswordMock implements SecurityPassword {
  async hashPassword(password: string): Promise<Response<string>> {
    return { success: true, data: `hashed_${password}` };
  }

  async comparePassword(password: string, hashedPassword: string): Promise<Response<boolean>> {
    return { success: true, data: hashedPassword === `hashed_${password}` };
  }
}
