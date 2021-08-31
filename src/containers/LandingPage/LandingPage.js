import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useEffect } from 'react'
import Pagination from 'react-js-pagination';

import ArticleList from '../../components/ArticleList/ArticleList'
import Footer from '../../components/Footer/Footer'
import ArticleMain from '../../components/ArticleMain/ArticleMain'
import Header from '../../components/Header/Header'
import Loading from '../../components/Loading/Loading'

import * as archiveActions from '../../actions/archiveActions'
import * as articleActions from '../../actions/articleActions'

import history from '../../history'
// import Loading from '../../assets/loading.gif'

import './LandingPage.css'


const LandingPage = ({
  fetchArticles,
  articlesFetched,
  articles,
  user,
  currentPage,
  setCurrentPage,
  setArticleToView,
  articleCount,
  fetchArticleCount,
  articleCountFetched,
  articleSubmitted,
  articleDeleteSuccess,
  resetArticleCount,
  setArchiveLocation,
  resetArticleFetchedState,
  }) => {

  useEffect(() => {
    const location = history.location.pathname
    setArchiveLocation(location)
    resetArticleCount()
    resetArticleFetchedState()
  }, [currentPage, resetArticleCount, resetArticleFetchedState, setArchiveLocation])

  useEffect(() => {
    return () => {
      setCurrentPage(1)
    }
  }, [setCurrentPage])

  useEffect(() => {
    if (!articleCountFetched) {
      fetchArticleCount()
    }
  }, [fetchArticleCount, articleCountFetched])

  useEffect(() => {
    if (!articlesFetched) {
      fetchArticles(currentPage)
    }
  }, [articlesFetched, fetchArticles, currentPage])

  const handlePageChange = data => {
    setCurrentPage(data)
  }
  
  const itemsPerPage = currentPage === 1 ? 10 : 9
  const mainArticle = articles.filter((article) => article.is_main);
  const nonMainArticles = articles.filter((article) => !article.is_main);
  return (
    <>
      <main className='landing-page'>
        <Header
          user={user}
        />
        {articlesFetched ? (
          <>
            {
              mainArticle.length ? (
                <>
                  <ArticleMain 
                    articles={mainArticle}
                    setArticleToView={setArticleToView}
                  />
                  <div className='hr-container'>
                    <hr className='solid-thin'></hr>
                  </div>
                </>
              ) : <></>
            }
            {
              nonMainArticles.length ?
              <ArticleList 
                articles={nonMainArticles}
                setArticleToView={setArticleToView}
              />
              : <></>
            }
            {
              articleCount &&
                <div className='pagination-container'>
                  <Pagination
                    // className="pagination"
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={articleCount}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                  />
                </div>
            }
          </>
        ) : (
          <Loading/>
        )}
      </main>
      <Footer />
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...articleActions,
      ...archiveActions,
    },
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    ...state.articleReducer,
    ...state.articleFormReducer,
    ...state.userReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
