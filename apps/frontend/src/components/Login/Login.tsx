import Form, { FormProps } from "../Form/Form"

const Register = ({labels, method, txtForBtn, urlAction}: FormProps ) => {
  return (
    <div>
        <a href="#">Register</a>
        <h1>Login user</h1>
        <Form labels={labels} method={method} txtForBtn={txtForBtn} urlAction={urlAction} />
    </div>
  )
}

export default Register