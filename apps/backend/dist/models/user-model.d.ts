import { IUser } from '../../../../domain/dist/index.js';
export declare const UserRole: {
    ADMIN: string;
    CLIENT: string;
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const UserModel: import("mongoose").Model<IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=user-model.d.ts.map