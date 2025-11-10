import { Link } from "react-router-dom"
import { IProductCartItem } from "../../../../../domain/dist"
import TableCart from "../TableCart/TableCart"

interface DataForOrder{
    products: IProductCartItem[]
}
const BuyOrder = ({products}: DataForOrder) => {
  return (
    <div className="alert alert-warning">
        <h1>Buy order</h1>
        <TableCart products={products}/>
        <Link className="btn btn-primary" to="/">Return to home </Link>
    </div>
  )
}

export default BuyOrder