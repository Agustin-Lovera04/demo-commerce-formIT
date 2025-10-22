import { IProduct } from "../../entities"
import { ProductsService } from "../../services/products/products-service"

export interface ArgumentsFunctionsProducts {
    dependencies: ProductsService
    payload?: Partial<IProduct>
}