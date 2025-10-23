import { Response, ICart, IProduct, calculateCartTotals, CartService } from "../../../../../../domain/dist/index";
import { CartModel } from "../../../models/cart-model";

function mapCart(cart: any): ICart {
    return {
        id: cart._id?.toString() ?? cart.id,
        products: cart.products.map((p: any) => ({
            product: p.product,
            quantity: p.quantity,
            price: p.price ?? 0,
            subtotal: p.subtotal ?? 0,
        })),
        total: cart.total ?? 0,
    };
}

export class CartServiceReal implements CartService {
    async create(): Promise<Response<ICart>> {
        return this.createCart();
    }

    async createCart(): Promise<Response<ICart>> {
        try {
            const cart = await CartModel.create({
                products: [],
                total: 0,
            });
            return { success: true, data: mapCart(cart.toObject()) };
        } catch (error) {
            return { success: false, error: "Error creating cart" };
        }
    }

    async findById(id: string): Promise<Response<ICart>> {
        try {
            const cart = await CartModel.findById(id).lean();
            if (!cart) return { success: false, error: "Cart not found" };
            return { success: true, data: mapCart(cart) };
        } catch (error) {
            return { success: false, error: "Error fetching cart" };
        }
    }

    async editOne(id: string, payload: Partial<ICart>): Promise<Response<ICart>> {
        try {
            const updated = await CartModel.findByIdAndUpdate(id, payload, { new: true }).lean();
            if (!updated) return { success: false, error: "Cart not found" };
            return { success: true, data: mapCart(updated) };
        } catch (error) {
            return { success: false, error: "Error editing cart" };
        }
    }

    async findAll(): Promise<Response<ICart[]>> {
        try {
            const carts = await CartModel.find().lean();
            return { success: true, data: carts.map(mapCart) };
        } catch (error) {
            return { success: false, error: "Error fetching carts" };
        }
    }

    async deleteOne(id: string): Promise<Response<void>> {
        try {
            const deleted = await CartModel.findByIdAndDelete(id).lean();
            if (!deleted) return { success: false, error: "Cart not found" };
            return { success: true, data: undefined };
        } catch (error) {
            return { success: false, error: "Error deleting cart" };
        }
    }

    async addProductToCart(cid: string, product: IProduct): Promise<Response<ICart>> {
        try {
            const cartResult = await this.findById(cid);
            if (!cartResult.success || !cartResult.data)
                return { success: false, error: "Cart not found" };

            const cart = cartResult.data;
            const index = cart.products.findIndex((p) => p.product === product.id);

            if (index === -1) {
                cart.products.push({
                    product: product.id,
                    quantity: 1,
                    price: product.price,
                    subtotal: product.price,
                });
            } else {
                if(cart.products[index]){
                    cart.products[index].quantity += 1;
                }
            }

            const { products, total } = calculateCartTotals(cart.products);
            cart.products = products;
            cart.total = total;

            const updateResult = await this.editOne(cid, cart);
            if (!updateResult.success)
                return { success: false, error: "Error updating cart" };

            return { success: true, data: mapCart(updateResult.data) };
        } catch (error) {
            return { success: false, error: "Error adding product to cart" };
        }
    }

    async deleteProductInCart(cid: string, pid: string): Promise < Response < ICart >> {
    try {
        const cartResult = await this.findById(cid);
        if(!cartResult.success || !cartResult.data)
        return { success: false, error: "Cart not found" };

        const cart = cartResult.data;
        cart.products = cart.products.filter((p) => p.product !== pid);
      
        const { products, total } = calculateCartTotals(cart.products);
        cart.products = products;
        cart.total = total;

        const updateResult = await this.editOne(cid, cart);
        if(!updateResult.success)
        return { success: false, error: "Error updating cart" };

        return { success: true, data: mapCart(updateResult.data) };
    } catch(error) {
        return { success: false, error: "Error deleting product from cart" };
    }
}
}
