import { FormProps } from "../Form/Form"
import Login from "../Login/Login"

const LoginContainer = () => {
  const argslogin: FormProps = {
    labels: ['email', 'password'],
    txtForBtn: 'Login',
    urlAction: `${import.meta.env.VITE_BASE_URL}/auth/login`,
    method: "POST"
  }
  return (
    <Login labels={argslogin.labels} txtForBtn={argslogin.txtForBtn} urlAction={argslogin.urlAction} method={argslogin.method}/>
  )
}

export default LoginContainer