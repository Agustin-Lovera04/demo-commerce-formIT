import { Entity } from "../utils/types/entity"

export interface IProductCartItem {
    product: string
    quantity: number
    price: number
    subtotal: number
}

export interface ICart extends Entity {
    products: IProductCartItem[],
    total: number
}