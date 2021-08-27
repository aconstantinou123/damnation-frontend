import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Title from '../Title/Title'

import * as articleActions from '../../actions/articleActions'

import './Header.css'

const Header = ({ user, setCurrentPage }) => {
  const handleHomeClick = () => setCurrentPage(1)
  return (
  <>
    <Title />
    <div className='header-button-container'>
      {/* <Link className='link' to='/about'>About</Link> */}
      <Link className='link' to='/submissions'>Submissions</Link>
      <Link className='link' to='/' onClick={handleHomeClick}>Home</Link>
      <Link className='link' to='/archive'>Archive</Link>
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
)}

const mapDispatchToProps  = (dispatch) => {
  return bindActionCreators(
    {
      ...articleActions,
    },
    dispatch
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.articleReducer,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)