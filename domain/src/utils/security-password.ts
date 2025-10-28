import { Response } from './types';
/* import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
 */

export interface SecurityPassword{
  hashPassword(password: string): Promise<Response<string>>
  comparePassword(password: string, hashedPassword: string):Promise<Response<boolean>>
}