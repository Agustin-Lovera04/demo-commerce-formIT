import { IProductCartItem } from "../../../../../domain/dist"
import Button from "../Button/Button"
import TableCart from "../TableCart/TableCart"

interface DataForCart {
    products: IProductCartItem[]
}

const Cart = ({products}: DataForCart) => {
  return (
    <>
        <div>Cart</div>
        <TableCart products={products}/>
        <Button label="Finally Buy" variant="success"></Button>
    </>
  )
}

export default Cart