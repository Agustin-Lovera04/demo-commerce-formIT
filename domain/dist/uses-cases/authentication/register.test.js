"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_mock_1 = require("../../services/mocks/auth-service-mock");
const vitest_1 = require("vitest");
const register_1 = require("./register");
const entities_1 = require("../../entities");
const user_mock_1 = require("../../entities/mocks/user-mock");
const cart_service_mocks_1 = require("../../services/mocks/cart-service-mocks");
(0, vitest_1.describe)('Register', () => {
    let cartService;
    let authenticationService;
    (0, vitest_1.beforeAll)(() => {
        const initialUsers = [
            (0, user_mock_1.userMock)({ email: 'agustin@gmail.com', password: 'Agustin' }),
            (0, user_mock_1.userMock)()
        ];
        cartService = new cart_service_mocks_1.CartServiceMock();
        authenticationService = new auth_service_mock_1.AuthenticationServiceMock(initialUsers);
    });
    (0, vitest_1.test)('Receives data from the user, creates it, and returns it.', async () => {
        const result = await (0, register_1.registerUser)({
            dependencies: { authenticationService, cartService },
            payload: {
                id: 'idUnique',
                email: 'test@gmail.com',
                password: 'test',
                name: 'Agustin',
                role: entities_1.UserRole.CLIENT
            }
        });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(result.data).toHaveProperty('email', 'test@gmail.com');
        }
    });
    (0, vitest_1.test)('Receives user data with email already existing in the database and should return an error', async () => {
        const result = await (0, register_1.registerUser)({
            dependencies: { authenticationService, cartService },
            payload: {
                id: 'idUnique',
                email: 'test@gmail.com',
                password: 'test',
                name: 'Agustin',
                role: entities_1.UserRole.CLIENT
            }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('User already exists');
        }
    });
    (0, vitest_1.test)('Receives user data with email already existing in the database and should return an error', async () => {
        const result = await (0, register_1.registerUser)({
            dependencies: { authenticationService, cartService },
            payload: {
                id: 'idUnique',
                email: 'test2@gmail.com',
                password: '',
                name: 'Agustin',
                role: entities_1.UserRole.CLIENT
            }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Invalid password');
        }
    });
    (0, vitest_1.test)('Receives user data with an invalid email and should return an error', async () => {
        const result = await (0, register_1.registerUser)({
            dependencies: { authenticationService, cartService },
            payload: {
                id: 'idUnique',
                email: 'test',
                password: 'test',
                name: 'Agustin',
                role: entities_1.UserRole.CLIENT
            }
        });
        (0, vitest_1.expect)(result.success).toBe(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error).toStrictEqual('Invalid email');
        }
    });
    (0, vitest_1.test)('Receives user data with role = ADMIN and must create and return the same', async () => {
        const result = await (0, register_1.registerUser)({
            dependencies: { authenticationService, cartService },
            payload: {
                id: 'idADMIN',
                email: 'ADMIN@gmail.com',
                password: 'ADMIN',
                name: 'ADMIN',
                role: entities_1.UserRole.ADMIN
            }
        });
        (0, vitest_1.expect)(result.success).toBe(true);
        if (result.success) {
            (0, vitest_1.expect)(result.data).toHaveProperty('role', 'ADMIN');
        }
    });
});
//# sourceMappingURL=register.test.js.map