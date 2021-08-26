import './Button.css'

const Button = ({ onClick, name }) => (
  <button className='damnation-button' onClick={onClick}>{name}</button>
)

export default Button