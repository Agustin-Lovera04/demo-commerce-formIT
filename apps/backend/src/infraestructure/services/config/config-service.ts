import { ConfigService, Response } from "../../../../../../domain/dist";
import dotenv from 'dotenv';

dotenv.config();

export class ConfigServiceImpl implements ConfigService {

  async getSecretKeyJWT(): Promise<Response<string>> {
    const secret = process.env.SECRET_KEY_JWT;
    if (!secret) {
      return {
        success: false,
        error: "JWT secret not configured"
      };
    }
    return {
      success: true,
      data: secret
    };
  }
}
