import { IProductCartItem } from "../../../../../domain/dist"
import Button from "../Button/Button"
import TableCart from "../TableCart/TableCart"

interface DataForOrder{
    products: IProductCartItem[]
}
const BuyOrder = ({products}: DataForOrder) => {
  return (
    <div className="bg-secondary">
        <h1>Buy order</h1>
        <TableCart products={products}/>
        <Button label="Return to home" variant="warning"></Button>
    </div>
  )
}

export default BuyOrder