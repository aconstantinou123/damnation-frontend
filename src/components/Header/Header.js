import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Title from '../Title/Title'
import history from '../../history'

import * as articleActions from '../../actions/articleActions'
import * as archiveActions from '../../actions/archiveActions'

import './Header.css'

const Header = ({ 
  user,
  setCurrentPage,
  setSearchValue,
  searchValue,
  resetArticleCount,
  resetArticleFetchedState,
}) => {
  const handleHomeClick = () => {
    setCurrentPage(1)
    resetArticleFetchedState()
    
  }
  const handleArchiveClick = () => {
    resetArticleCount()
  }
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    history.push(`/search/${searchValue}`)
  }
  const handleSearchOnChange = (e) => {
    setSearchValue(e.target.value)
  }
  return (
  <>
    <Title />
    <div className='header-button-container'>
      {/* <Link className='link' to='/about'>About</Link> */}
      <Link className='link' to='/submissions'>Submissions</Link>
      <Link className='link' to='/' onClick={handleHomeClick}>Home</Link>
      <Link className='link' to='/archive' onClick={handleArchiveClick}>Archive</Link>
      {
        user && (
          <>
            <Link className='link' to='/create'>Create Article</Link>
            <Link className='link' to='/logout'>Logout</Link>
          </>
        )
      }
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input 
            className='search-input' 
            type="text" 
            placeholder="Search.." 
            name="search"
            value={searchValue}
            onChange={handleSearchOnChange}
            />
          <button type="submit">Submit</button>
        </form>
    </div>
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
      ...archiveActions,
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