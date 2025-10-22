import { ICart, IProductCartItem } from "../entities/index";

export function calculateCartTotals(products: IProductCartItem[]) {
  const updatedProducts = products.map(p => ({
    ...p,
    subtotal: p.quantity * p.price
  }));

  const total = updatedProducts.reduce((sum, p) => sum + p.subtotal, 0);

  return { products: updatedProducts, total };
}
