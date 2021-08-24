import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { useEffect } from "react"
import { Link } from 'react-router-dom'

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

  const mainArticle = articles.filter((article) => article.is_main);
  const nonMainArticles = articles.filter((article) => !article.is_main);
  return (
    <>
      <main className="landing-page">
        <Title />
        <div className="landing-page-button-container">
          <Link to="/about">About</Link>
          {
            user && (
              <>
                <Link to="/create">Create Article</Link>
                <Link to="/logout">Logout</Link>
              </>
            )
          }
        </div>
        <hr className="solid-thick"></hr>
        {articlesFetched ? (
          <>
            <ArticleMain articles={mainArticle} />
            <hr className="solid-thin"></hr>
            <ArticleList articles={nonMainArticles} />
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
