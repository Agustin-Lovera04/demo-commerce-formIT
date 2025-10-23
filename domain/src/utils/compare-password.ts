import bcrypt from 'bcrypt';

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}
