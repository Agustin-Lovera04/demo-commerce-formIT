import { Response } from "../utils";

export interface ConfigService {
  getSecretKeyJWT(): Promise<Response<string>>;
}