"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigServiceMock = void 0;
class ConfigServiceMock {
    async getSecretKeyJWT() {
        return { success: true, data: 'test-secret-key' };
    }
}
exports.ConfigServiceMock = ConfigServiceMock;
//# sourceMappingURL=config-service-mock.js.map