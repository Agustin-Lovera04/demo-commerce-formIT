import { Link } from "react-router-dom"
import Form, { FormProps } from "../Form/Form"

const Register = ({labels, method, txtForBtn, urlAction}: FormProps ) => {
  return (
    <div>
        <Link to="#">Register</Link>
        <h1>Login user</h1>
        <Form labels={labels} method={method} txtForBtn={txtForBtn} urlAction={urlAction} />
    </div>
  )
}

export default Register