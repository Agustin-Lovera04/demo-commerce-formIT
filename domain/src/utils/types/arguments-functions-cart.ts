import { ICart } from "../../entities"
import { CartService } from "../../services/cart/cart-service"

export interface ArgumentsFunctionsCart {
    dependencies: CartService
    payload?: Partial<ICart>
}