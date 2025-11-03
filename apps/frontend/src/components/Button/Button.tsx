interface ButtonProps {
    label: string
    variant: 'success' | 'danger' | 'warning',
    type?: 'submit' | 'button'
    onClick?: () => any
}

const Button = ({label, variant, type, onClick}: ButtonProps) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} type={type}>{label}</button>
  )
}

export default Button