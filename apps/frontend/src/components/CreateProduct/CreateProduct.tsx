import Form, { FormProps } from "../Form/Form"

const CreateProduct = ({labels, method, txtForBtn, urlAction}: FormProps) => {
  return (
    <div>
        <h1>Create Product</h1>
        <Form labels={labels} method={method} txtForBtn={txtForBtn} urlAction={urlAction}/>
    </div>
  )
}

export default CreateProduct