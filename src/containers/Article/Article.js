import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { bindActionCreators } from "redux"
import { useEffect } from "react"

import "./Article.css";
// import articles from "../../data/data.json"
import ArticleView from "../../components/ArticleView/ArticleView"

import * as articleActions from '../../actions/articleActions'

const Article = ({ articles, articlesFetched, fetchArticles }) => {

  useEffect(() => {
    if (!articlesFetched) {
      fetchArticles();
    }
  }, [fetchArticles, articlesFetched]);

  const { id } = useParams()
  const article = articles.find(article => article.id === id)
  return (
    <div className="article-container">
      {
        articlesFetched
        ? <ArticleView article={article} />
        : <div>Loading...</div>
      }
      
    </div>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Article);

