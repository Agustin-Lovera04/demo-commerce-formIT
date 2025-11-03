import Form, { FormProps } from "../Form/Form"

const DeleteProduct = ({labels, method, txtForBtn, urlAction}: FormProps) => {
  return (
    <div>
        <h1>Delete Product</h1>
        <Form labels={labels} method={method} txtForBtn={txtForBtn} urlAction={urlAction} />
    </div>
  )
}

export default DeleteProduct