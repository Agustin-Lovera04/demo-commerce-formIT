interface ButtonProps {
    label: string
    variant: 'success' | 'danger'
}

const Button = ({label, variant}: ButtonProps) => {
  return (
    <button className={`btn btn-${variant}`}>{label}</button>
  )
}

export default Button