import Form, { FormProps } from "../Form/Form"

const Login = ({labels, method, txtForBtn, urlAction}: FormProps ) => {
  return (
    <div>
        <h1>Login user</h1>
        <Form labels={labels} method={method} txtForBtn={txtForBtn} urlAction={urlAction} />
    </div>
  )
}

export default Login