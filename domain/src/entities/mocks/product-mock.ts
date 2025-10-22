import { faker } from "@faker-js/faker";
import { IProduct } from "../product";

export function productMock(data?: Partial<IProduct>): IProduct {
  return {
    id: crypto.randomUUID(),
    title: faker.commerce.product(),
    price: faker.number.int({ max: 10000, min: 5000 }),
    stock: true,
    ...data,
  };
}