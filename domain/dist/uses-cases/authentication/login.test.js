"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const auth_service_mock_1 = require("../../services/mocks/auth-service-mock");
const user_mock_1 = require("../../entities/mocks/user-mock");
const login_1 = require("./login");
const utils_1 = require("../../utils");
(0, vitest_1.describe)('Login User', () => {
    let authenticationService;
    (0, vitest_1.beforeAll)(async () => {
        const hashPasswordForTest = await (0, utils_1.hashPassword)('Agustin');
        const initialUsers = [
            (0, user_mock_1.userMock)({ email: 'agustin@gmail.com', password: hashPasswordForTest }),
            (0, user_mock_1.userMock)()
        ];
        authenticationService = new auth_service_mock_1.AuthenticationServiceMock(initialUsers);
    });
    (0, vitest_1.test)("Receive user data and compare it with existing users and should return a JWT set in cookies with the user information.", async () => {
        const result = await (0, login_1.loginUser)({
            dependencies: { authenticationService },
            payload: {
                email: 'agustin@gmail.com',
                password: 'Agustin'
            }
        });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(result.data).toBeTypeOf('string');
        }
    });
    (0, vitest_1.test)("Receive data from user with invalid email and compare it with existing users and should return a JWT with the user's information.", async () => {
        const result = await (0, login_1.loginUser)({
            dependencies: { authenticationService },
            payload: {
                email: 'Agustin"@',
                password: 'Agustin'
            }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Invalid email');
        }
    });
    (0, vitest_1.test)("Receive data from user with invalid password and compare it with existing users and should return a JWT with the user's information.", async () => {
        const result = await (0, login_1.loginUser)({
            dependencies: { authenticationService },
            payload: {
                email: 'agustin@gmail.com',
                password: 'fail'
            }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Invalid credentials');
        }
    });
    (0, vitest_1.test)("Receive data from user with invalid password and compare it with existing users and should return a JWT with the user's information.", async () => {
        const result = await (0, login_1.loginUser)({
            dependencies: { authenticationService },
            payload: {
                email: 'agustin@gmail.com',
                password: ''
            }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Invalid credentials');
        }
    });
});
//# sourceMappingURL=login.test.js.map