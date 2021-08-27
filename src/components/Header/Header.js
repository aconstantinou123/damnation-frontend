import { Link } from 'react-router-dom'
import Title from '../Title/Title'

import './Header.css'

const Header = ({ user }) => (
  <>
    <Title />
    <div className='header-button-container'>
      <Link className='link' to='/about'>About</Link>
      <Link className='link' to='/submissions'>Submissions</Link>
      <Link className='link' to='/archive'>Archive</Link>
      <Link className='link' to='/'>Home</Link>
      {
        user && (
          <>
            <Link className='link' to='/create'>Create Article</Link>
            <Link className='link' to='/logout'>Logout</Link>
          </>
        )
      }
    </div>
    <div className='hr-container'>
      <hr className='solid-thick'></hr>
    </div>
  </>
)

export default Header