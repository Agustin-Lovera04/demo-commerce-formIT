import { Entity } from "../utils/types/entity"

export interface IProduct extends Entity{
    title: string
    price: number
    stock: boolean
}