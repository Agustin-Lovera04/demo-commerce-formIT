"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceMock = void 0;
const base_service_mock_1 = require("./base-service-mock");
class UserServiceMock extends base_service_mock_1.BaseServiceMock {
    constructor(initialUsers = []) {
        super(initialUsers);
    }
}
exports.UserServiceMock = UserServiceMock;
//# sourceMappingURL=user-service-mocks.js.map