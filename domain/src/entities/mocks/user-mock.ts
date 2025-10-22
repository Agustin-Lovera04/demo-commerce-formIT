import { faker } from "@faker-js/faker";
import { IUser, UserRole } from './../user';

export function userMock(data?: Partial<IUser>): IUser {
  return {
    id: crypto.randomUUID(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.person.firstName(),
    role: UserRole.CLIENT,
    ...data,
  };
}