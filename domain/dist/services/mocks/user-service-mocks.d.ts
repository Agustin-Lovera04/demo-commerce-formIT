import { UserService } from './../users/users-service';
import { IUser } from './../../entities/user';
import { BaseServiceMock } from "./base-service-mock";
export declare class UserServiceMock extends BaseServiceMock<IUser> implements UserService {
    constructor(initialUsers?: IUser[]);
}
//# sourceMappingURL=user-service-mocks.d.ts.map