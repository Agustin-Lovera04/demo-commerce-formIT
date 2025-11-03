import { IProductCartItem } from "../../../../../domain/dist"
import Button from "../Button/Button"
import TableCart from "../TableCart/TableCart"

interface DataForCart {
    products: IProductCartItem[]
}

const Cart = ({products}: DataForCart) => {
  return (
    <>
        <h1>Cart</h1>
        <TableCart products={products}/>
        <Button label="Clean cart" variant="danger"/>
        <Button label="Buy" variant="success"/>
    </>
  )
}

export default Cart
