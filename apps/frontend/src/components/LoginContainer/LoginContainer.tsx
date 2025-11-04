import { FormProps } from "../Form/Form"
import Login from "../Login/Login"

const LoginContainer = () => {
  const argslogin: FormProps = {
    labels: ['Email', 'Password', 'Name'],
    txtForBtn: 'Register',
    urlAction: `${import.meta.env.BASE_URL}/auth/register`,
    method: "POST"
  }
  return (
    <Login labels={argslogin.labels} txtForBtn={argslogin.txtForBtn} urlAction={argslogin.urlAction} method={argslogin.method}/>
  )
}

export default LoginContainer