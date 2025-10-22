import { Entity } from "../utils/types/entity";
export declare const UserRole: {
    ADMIN: string;
    CLIENT: string;
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export interface IUser extends Entity {
    email: string;
    password: string;
    name: string;
    cartId?: string;
    role: UserRole;
}
//# sourceMappingURL=user.d.ts.map