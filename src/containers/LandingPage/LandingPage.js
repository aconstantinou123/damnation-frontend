import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useEffect } from 'react'
import Pagination from 'react-js-pagination';

import ArticleList from '../../components/ArticleList/ArticleList'
import Footer from '../../components/Footer/Footer'
import ArticleMain from '../../components/ArticleMain/ArticleMain'
import Header from '../../components/Header/Header'

import './LandingPage.css'

import * as articleActions from '../../actions/articleActions'

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
  }) => {

  

  useEffect(() => {
      fetchArticles(currentPage)
      resetArticleCount()
  }, [currentPage, fetchArticles, resetArticleCount]);

  useEffect(() => {
    return () => setCurrentPage(1)
  }, [setCurrentPage])

  useEffect(() => {
    if (articleSubmitted) {
      fetchArticleCount()
    }
  }, [articleSubmitted, fetchArticleCount]);

  useEffect(() => {
    if (articleDeleteSuccess) {
      fetchArticleCount()
    }
  }, [articleDeleteSuccess, fetchArticleCount]);

  useEffect(() => {
    if (!articleCountFetched) {
      fetchArticleCount()
    }
  }, [fetchArticleCount, articleCountFetched])

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
            <ArticleList 
              articles={nonMainArticles}
              setArticleToView={setArticleToView}
            />
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
          <div>Loading...</div>
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
