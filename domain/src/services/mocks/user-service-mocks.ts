import { UserService } from './../users/users-service';
import { IUser } from './../../entities/user';
import { BaseServiceMock } from "./base-service-mock";

export class UserServiceMock extends BaseServiceMock<IUser> implements UserService{
    constructor(initialUsers: IUser[] = []){
        super(initialUsers)
    }
  
}