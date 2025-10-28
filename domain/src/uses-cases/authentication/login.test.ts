import { describe, test, expect, beforeAll } from 'vitest'
import { AuthenticationServiceMock } from '../../services/mocks/auth-service-mock'
import { userMock } from "../../entities/mocks/user-mock";
import { loginUser } from './login'
import { hashPassword } from '../../utils';
import { ConfigServiceMock } from '../../services/mocks/config-service-mock';


describe('Login User', () => {
    let configService: ConfigServiceMock
    let authenticationService: AuthenticationServiceMock

    beforeAll(async ()=>{
        const hashPasswordForTest = await hashPassword('Agustin')
        const initialUsers = [
            userMock({email: 'agustin@gmail.com', password: hashPasswordForTest}),
            userMock()
        ]

        authenticationService = new AuthenticationServiceMock(initialUsers)
        configService= new ConfigServiceMock()
    })


    test("Receive user data and compare it with existing users and should return a JWT set in cookies with the user information.", async () => {
        const result = await loginUser({
            dependencies: { authenticationService, configService },
            payload: {
                email: 'agustin@gmail.com',
                password: 'Agustin'
            }
        })

        expect(result.success).toBe(true)
        if(result.success){
            expect(result.data).toBeTypeOf('string')
        }
    })

    test("Receive data from user with invalid email and compare it with existing users and should return a JWT with the user's information.", async () => {
        const result = await loginUser({
            dependencies: { authenticationService, configService },
            payload: {
                email: 'Agustin"@',
                password: 'Agustin'
            }
        })

        expect(result.success).toBe(false)
        if(!result.success){
            expect(result.error).toStrictEqual('Invalid email')
        }
    })

    test("Receive data from user with invalid password and compare it with existing users and should return a JWT with the user's information.", async () => {
        const result = await loginUser({
            dependencies: { authenticationService, configService },
            payload: {
                email: 'agustin@gmail.com',
                password: 'fail'
            }
        })
        expect(result.success).toBe(false)
        if(!result.success){
            expect(result.error).toStrictEqual('Invalid credentials')
        }
    })


    test("Receive data from user with invalid password and compare it with existing users and should return a JWT with the user's information.", async () => {
        const result = await loginUser({
            dependencies: { authenticationService, configService },
            payload: {
                email: 'agustin@gmail.com',
                password: ''
            }
        })
        expect(result.success).toBe(false)
        if(!result.success){
            expect(result.error).toStrictEqual('Invalid credentials')
        }
    })
})