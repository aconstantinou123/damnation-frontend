import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { useEffect } from "react"
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

import ArticleList from "../../components/ArticleList/ArticleList"
import Title from "../../components/Title/Title"
import Footer from "../../components/Footer/Footer"
import ArticleMain from "../../components/ArticleMain/ArticleMain"

import "./LandingPage.css"

import * as articleActions from "../../actions/articleActions"

const LandingPage = ({
  fetchArticles,
  articlesFetched,
  articles,
  user,
  articleDeleteSuccess,
  articleSubmitted,
  }) => {
  useEffect(() => {
    if (!articlesFetched) {
      fetchArticles()
    }
  }, [fetchArticles, articlesFetched]);

  useEffect(() => {
    if(articleDeleteSuccess) {
      fetchArticles()
    }
  }, [fetchArticles, articleDeleteSuccess])

  useEffect(() => {
    if(articleSubmitted) {
      fetchArticles()
    }
  }, [fetchArticles, articleSubmitted])

  const handlePageClick = data => console.log(data) 

  const mainArticle = articles.filter((article) => article.is_main);
  const nonMainArticles = articles.filter((article) => !article.is_main);
  return (
    <>
      <main className="landing-page">
        <Title />
        <div className="landing-page-button-container">
          <Link to="/about">About</Link>
          <Link to="/submissions">Submissions</Link>
          {
            user && (
              <>
                <Link to="/create">Create Article</Link>
                <Link to="/logout">Logout</Link>
              </>
            )
          }
        </div>
        <div className="hr-container">
          <hr className="solid-thick"></hr>
        </div>
        {articlesFetched ? (
          <>
            <ArticleMain articles={mainArticle} />
            <div className="hr-container">
              <hr className="solid-thin"></hr>
            </div>
            <ArticleList articles={nonMainArticles} />
            <div className='pagination-container'>
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={10}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
                />
            </div>
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
