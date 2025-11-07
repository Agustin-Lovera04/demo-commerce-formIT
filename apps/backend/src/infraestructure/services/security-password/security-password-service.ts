import bcrypt from "bcrypt";
import { SecurityPassword, Response } from "../../../../../../domain/dist";

export class SecurityPasswordImpl implements SecurityPassword {
  async hashPassword(password: string): Promise<Response<string>> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return { success: true, data: hashedPassword };
    } catch (error) {
      return { success: false, error: "Error hashing password" };
    }
  }

  async comparePassword(password: string, hashedPassword: string): Promise<Response<boolean>> {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      if(match === false)return { success: false, error: "Invalid credentials" };
      return { success: true, data: match };
    } catch (error) {
      return { success: false, error: "Error comparing password" };
    }
  }
}
