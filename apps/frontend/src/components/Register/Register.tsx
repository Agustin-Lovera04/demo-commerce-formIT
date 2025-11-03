import Form, { FormProps } from "../Form/Form"

const Register = ({labels, method, txtForBtn, urlAction}: FormProps ) => {
  return (
    <div>
        <h1>Register user</h1>
        <Form labels={labels} method={method} txtForBtn={txtForBtn} urlAction={urlAction} />
    </div>
  )
}

export default Register