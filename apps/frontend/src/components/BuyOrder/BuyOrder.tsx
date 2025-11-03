import { IProductCartItem } from "../../../../../domain/dist"
import TableCart from "../TableCart/TableCart"

interface DataForOrder{
    products: IProductCartItem[]
}
const BuyOrder = ({products}: DataForOrder) => {
  return (
    <div className="bg-secondary">
        <h1>Buy order</h1>
        <TableCart products={products}/>
    </div>
  )
}

export default BuyOrder