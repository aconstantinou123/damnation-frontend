import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { useEffect } from "react"

import ArticleList from "../../components/ArticleList/ArticleList"
import Title from "../../components/Title/Title"
import Footer from "../../components/Footer/Footer"
import ArticleMain from "../../components/ArticleMain/ArticleMain"

import "./LandingPage.css"

import * as articleActions from "../../actions/articleActions"

function LandingPage({ fetchArticles, articlesFetched, articles }) {
  useEffect(() => {
    if (!articlesFetched) {
      fetchArticles();
    }
  }, [fetchArticles, articlesFetched]);

  const mainArticle = articles.filter((article) => article.is_main);
  const nonMainArticles = articles.filter((article) => !article.is_main);
  return (
    <>
      <main className="landing-page">
        <Title />
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
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...articleActions,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    ...state.articleReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
