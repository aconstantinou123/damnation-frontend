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
  resetArticleCount,
  setLocation,
  resetArticleFetchedState,
  fetchMainArticle,
  mainArticle,
  mainArticleFetched,
  resetMainArticleState,
  }) => {

  useEffect(() => {
    const location = history.location.pathname
    setLocation(location)
    resetArticleFetchedState()
  }, [currentPage, resetArticleCount, resetArticleFetchedState, setLocation])

  useEffect(() => {
    return () => {
      resetMainArticleState()
    }
  }, [resetMainArticleState])

  useEffect(() => {
    if (!articlesFetched) {
      fetchArticles(true)
    }
  }, [articlesFetched, fetchArticles])

  useEffect(() => {
    if (!mainArticleFetched && currentPage === 1) {
      fetchMainArticle()
    }
  }, [mainArticleFetched, fetchMainArticle, currentPage])

  const handlePageChange = data => {
    setCurrentPage(data)
    window.scrollTo(0, 0)
  }
  

  return (
    <>
      <main className='landing-page'>
        <div className='landing-page-container'>
          `<Header
            user={user}
          />
          {articlesFetched ? (
            <>
              {
                (mainArticle.length && currentPage === 1) ? (
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
                articles.length ?
                <ArticleList 
                  articles={articles}
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
                      itemsCountPerPage={9}
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
        </div>
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
