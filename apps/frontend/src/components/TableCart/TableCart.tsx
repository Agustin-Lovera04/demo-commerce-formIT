import { IProductCartItem } from "../../../../../domain/dist"

interface ProductsForTable {
    products: IProductCartItem[]
}

const TableCart = ({products}: ProductsForTable) => {
  return (
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.product}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td>{product.subtotal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableCart