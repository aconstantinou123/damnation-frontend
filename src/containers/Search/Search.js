import Pagination from 'react-js-pagination'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../../components/Header/Header'
import ArticleList from '../../components/ArticleList/ArticleList'
import Loading from '../../components/Loading/Loading'

import * as articleActions from '../../actions/articleActions'
import * as archiveActions from '../../actions/archiveActions'

import history from '../../history'

import './Search.css'

const Search = ({
  articles,
  setArticleToView,
  articleCount,
  currentPage,
  setCurrentPage,
  user,
  searchArticles,
  searchArticlesFetched,
  resetArticleCount,
  setLocation,
  setSearchValue,
  resetSearchFetchedState,
}) => {

  const { search } = useParams()

  useEffect(() => {
    const location = history.location.pathname
    setSearchValue(search)
    setLocation(location)
    resetSearchFetchedState()
  }, [setSearchValue, search, setLocation, resetSearchFetchedState, resetArticleCount])

  useEffect(() => {
    return () => {
      setSearchValue('')
    }
  }, [setCurrentPage, setSearchValue])

  useEffect(() => {
    if (!searchArticlesFetched) {
      searchArticles(search, currentPage)
    }
  }, [searchArticlesFetched, searchArticles, currentPage, search])


  const handlePageChange = data => {
    resetSearchFetchedState()
    setCurrentPage(data)
  }
  return (
    <>
      <Header
        user={user}
      />
      {
        searchArticlesFetched ? (
          <>
            <ArticleList 
              articles={articles}
              setArticleToView={setArticleToView}
            />
            {
              articleCount ?
                <div className='pagination-container'>
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={9}
                    totalItemsCount={articleCount}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                  />
                </div>
                : <></>
            }
          </>
        ) : (
          <Loading/>
        )
      }
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
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
    ...state.archiveReducer,
    ...state.articleReducer,
    ...state.articleFormReducer,
    ...state.userReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)