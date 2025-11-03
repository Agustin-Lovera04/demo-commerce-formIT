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
        {/* Como hago para pasarles fn */}
        <Button label="Finally Buy" variant="success"></Button>
    </>
  )
}

export default Cart

//Integrar Llamadas reales a API