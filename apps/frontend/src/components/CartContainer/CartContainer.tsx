import Cart from "../Cart/Cart"

const CartContainer = () => {
    const products = [
        {
            product: 'Prod1',
            quantity: 2,
            price: 100,
            subtotal: 200
        },
        {
            product: 'Prod2',
            quantity: 1,
            price: 400,
            subtotal: 400
        }
        ]
  return (
    <Cart products={products}></Cart>
  )
}

export default CartContainer