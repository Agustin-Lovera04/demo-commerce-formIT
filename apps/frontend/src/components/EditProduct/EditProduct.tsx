import Form, { FormProps } from "../Form/Form"

const EditProduct = ({labels, method, txtForBtn, urlAction, id}: FormProps) => {
  return (
    <div>
        <h1>Edit Product: {id} </h1>
        <Form labels={labels} method={method} txtForBtn={txtForBtn} urlAction={urlAction} id={id} />
    </div>
  )
}

export default EditProduct