
import { ConfigService } from "../../config";
import { Response } from "../../utils";

export class ConfigServiceMock implements ConfigService {
    async getSecretKeyJWT(): Promise<Response<string>> {
        return { success: true, data: 'test-secret-key' };
    }
}