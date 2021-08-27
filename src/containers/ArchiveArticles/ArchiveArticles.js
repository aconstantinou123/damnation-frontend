import Pagination from 'react-js-pagination'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../../components/Header/Header'
import ArticleList from '../../components/ArticleList/ArticleList'

import * as articleActions from '../../actions/articleActions'
import * as archiveActions from '../../actions/archiveActions'

import history from '../../history'

import './ArchiveArticles.css'

const ArchiveArticle = ({
  articles,
  setArticleToView,
  articleCount,
  currentPage,
  setCurrentPage,
  user,
  fetchArticles,
  articleSubmitted,
  fetchArticleCount,
  articleDeleteSuccess,
  articleCountFetched,
  resetArticleCount,
  setArchiveLocation,
  archiveLocation,
}) => {

  const { date } = useParams()

  useEffect(() => {
    fetchArticles(currentPage, date)
    resetArticleCount()
  }, [currentPage, fetchArticles, date, resetArticleCount]);

  useEffect(() => {
    return () => setCurrentPage(1)
  }, [setCurrentPage])

  useEffect(() => {
    const location = history.location.pathname
    setArchiveLocation(location)
  }, [setArchiveLocation])

  useEffect(() => {
    if (articleSubmitted) {
      fetchArticleCount(date)
    }
  }, [articleSubmitted, fetchArticleCount, date]);

  useEffect(() => {
    if (articleDeleteSuccess) {
      fetchArticleCount(date)
    }
  }, [articleDeleteSuccess, fetchArticleCount, date]);

  useEffect(() => {
    if (!articleCountFetched) {
      fetchArticleCount(date)
    }
  }, [fetchArticleCount, articleCountFetched, date])


  const handlePageChange = data => {
    setCurrentPage(data)
  }
  return (
    <>
      <Header
        user={user}
      />
      <ArticleList 
        articles={articles}
        setArticleToView={setArticleToView}
      />
      {
        articleCount &&
          <div className='pagination-container'>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={9}
              totalItemsCount={articleCount}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveArticle)