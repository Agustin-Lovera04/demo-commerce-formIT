import { IProductCartItem } from "../../../../../domain/dist"
import TableCart from "../TableCart/TableCart"

interface DataForCart {
    products: IProductCartItem[]
}

const Cart = ({products}: DataForCart) => {
  return (
    <>
        <h1>Cart</h1>
        <TableCart products={products}/>
    </>
  )
}

export default Cart
