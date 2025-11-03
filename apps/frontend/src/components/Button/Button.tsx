interface ButtonProps {
    label: string
    variant: 'success' | 'danger' | 'warning',
    onClick: () => void
}

const Button = ({label, variant, onClick}: ButtonProps) => {
  return (
    <button className={`btn btn-${variant}`} onClick={()=>onClick()}>{label}</button>
  )
}

export default Button