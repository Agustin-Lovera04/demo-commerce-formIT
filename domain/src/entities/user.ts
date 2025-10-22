import { Entity } from "../utils/types/entity"

export const UserRole = {
    ADMIN: 'ADMIN',
    CLIENT: 'CLIENT'
}

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export interface IUser extends Entity{
    email: string
    password: string
    name: string
    cartId?: string
    role: UserRole
}
