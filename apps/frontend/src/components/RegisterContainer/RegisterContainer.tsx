import { FormProps } from "../Form/Form"
import Register from "../Register/Register"

const RegisterContainer = () => {
  const argsRegister: FormProps = {
    labels: ['email', 'password', 'name'],
    txtForBtn: 'Register',
    urlAction: `${import.meta.env.VITE_BASE_URL}/auth/register`,
    method: "POST"
  }
  return (
    <Register labels={argsRegister.labels} txtForBtn={argsRegister.txtForBtn} urlAction={argsRegister.urlAction} method={argsRegister.method}/>
  )
}

export default RegisterContainer