import { AuthenticationServiceMock } from '../../services/mocks/auth-service';
import { describe, test, expect, beforeAll } from 'vitest'
import { registerUser } from './register'
import { UserRole } from '../../entities';
import { userMock } from '../../entities/mocks/user-mock';

describe('Register', () => {

    let authenticationService: AuthenticationServiceMock

    beforeAll(() => {
        const initialUsers = [
            userMock({ email: 'agustin@gmail.com', password: 'Agustin' }),
            userMock()
        ]

        authenticationService = new AuthenticationServiceMock(initialUsers)
    })

    test('Receives data from the user, creates it, and returns it.', async () => {
        const result = await registerUser({
            dependencies: { authenticationService },
            payload: {
                id: 'idUnique',
                email: 'test@gmail.com',
                password: 'test',
                name: 'Agustin',
                role: UserRole.CLIENT
            }
        })

        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data).toHaveProperty('email', 'test@gmail.com')
        }
    })

   test('Receives user data with email already existing in the database and should return an error', async () => {
         const result = await registerUser({
             dependencies: { authenticationService },
             payload: {
                 id: 'idUnique',
                 email: 'test@gmail.com',
                 password: 'test',
                 name: 'Agustin',
                 role: UserRole.CLIENT
             }
         })
 
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error).toStrictEqual('User already exists')
        }
     })
 
        test('Receives user data with email already existing in DB and should return an error', async () => {
         const result = await registerUser({
             dependencies: { authenticationService },
             payload: {
                 id: 'idUnique',
                 email: 'test2@gmail.com',
                 password: '',
                 name: 'Agustin',
                 role: UserRole.CLIENT
             }
         })
 
         expect(result).toStrictEqual('Invalid password')
     })
 
 /*    
     test('Receives user data with invalid email and should return an error', async () => {
         const result = await registerUser({
             dependencies: { authenticationService },
             payload: {
                 id: 'idUnique',
                 email: 'test',
                 password: 'test',
                 name: 'Agustin',
                 role: UserRole.CLIENT
             }
         })
 
         expect(result).toStrictEqual('Invalid email')
     })
         
     test('Receives user data with role = ADMIN and should create and return the same', async () => {
         const result = await registerUser({
             dependencies: { authenticationService },
             payload: {
                 id: 'idADMIN',
                 email: 'ADMIN@gmail.com',
                 password: 'ADMIN',
                 name: 'ADMIN',
                 role: UserRole.ADMIN
             }
         })
 
         expect(result).toHaveProperty('role', 'ADMIN');
     }) */
})