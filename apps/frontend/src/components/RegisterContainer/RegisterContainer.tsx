import { FormProps } from "../Form/Form"
import Register from "../Register/Register"

const RegisterContainer = () => {
  const argsRegister: FormProps = {
    labels: ['Email', 'Password', 'Name'],
    txtForBtn: 'Register',
    urlAction: `${import.meta.env.BASE_URL}/auth/register`,
    method: "POST"
  }
  return (
    <Register labels={argsRegister.labels} txtForBtn={argsRegister.txtForBtn} urlAction={argsRegister.urlAction} method={argsRegister.method}/>
  )
}

export default RegisterContainer