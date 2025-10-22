import { ICart, IProduct } from "../../entities";
import { Response } from "../../utils";
import { CartService } from "../cart/cart-service";
import { BaseServiceMock } from "./base-service-mock";
import { calculateCartTotals } from "../../utils/index";

export class CartServiceMock extends BaseServiceMock<ICart> implements CartService {
  constructor(initialCarts: ICart[] = []) {
    super(initialCarts);
  }

  async createCart(): Promise<Response<ICart>> {
    const cart: ICart = {
      id: crypto.randomUUID(),
      products: [],
      total: 0,
    };
    this.items.push(cart);
    return { success: true, data: cart };
  }

  async addProductToCart(cid: string, product: IProduct): Promise<Response<ICart>> {
    const cartResult = await this.findById(cid);


    if (!cartResult.success || !cartResult.data)
      return { success: false, error: "Cart not found" };

    const cart = cartResult.data;

    const index = cart.products.findIndex(p => p.product === product.id);

    if (index === -1) {
      cart.products.push({
        product: product.id,
        quantity: 1,
        price: product.price,
        subtotal: product.price
      });
    } else {
        if(cart.products[index]){
            const item = cart.products[index];
            item.quantity += 1;
        }
    }

    const { products, total } = calculateCartTotals(cart.products);
    cart.products = products;
    cart.total = total;

    const updateResult = await this.editOne(cid, cart);


    if (!updateResult.success)
      return { success: false, error: "Error updating cart" };

    return { success: true, data: updateResult.data };
  }

  async deleteProductInCart(cid: string, pid: string): Promise<Response<ICart>> {
    const cartResult = await this.findById(cid);
    if (!cartResult.success || !cartResult.data)
      return { success: false, error: "Cart not found" };

    const cart = cartResult.data;
    cart.products = cart.products.filter(p => p.product !== pid);

    const { products, total } = calculateCartTotals(cart.products);
    cart.products = products;
    cart.total = total;

    const updateResult = await this.editOne(cid, cart);
    if (!updateResult.success)
      return { success: false, error: "Error updating cart" };

    return { success: true, data: updateResult.data! };
  }
}
