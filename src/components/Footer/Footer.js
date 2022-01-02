import './Footer.css'

const Footer = () => {
  const year = new Date().getFullYear() 
  return (
    <footer>
      <p>&copy; {year} Damnation</p>
    </footer>
  )
}

export default  Footer