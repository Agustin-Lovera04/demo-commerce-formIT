"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMock = userMock;
const faker_1 = require("@faker-js/faker");
const user_1 = require("./../user");
function userMock(data) {
    return {
        id: crypto.randomUUID(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
        name: faker_1.faker.person.firstName(),
        role: user_1.UserRole.CLIENT,
        ...data,
    };
}
//# sourceMappingURL=user-mock.js.map