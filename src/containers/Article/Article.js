import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { bindActionCreators } from "redux"
import { useEffect } from "react"

import "./Article.css";

import ArticleView from "../../components/ArticleView/ArticleView"

import * as articleActions from '../../actions/articleActions'
import * as articleFormActions from '../../actions/articleFormActions'

const Article = ({ 
  articles,
  articlesFetched,
  fetchArticles,
  selectArticleToEdit,
  deleteArticle,
  articleSubmitted,
  user,
}) => {

  useEffect(() => {
    if (!articlesFetched) {
      fetchArticles();
    }
    
  }, [fetchArticles, articlesFetched]);


  useEffect(() => {
    if (articleSubmitted) {
      fetchArticles();
    }
  }, [fetchArticles, articleSubmitted]);


  const { id } = useParams()
  const article = articles.find(article => article.id === id)
  return (
    <div className="article-container">
      {
        articlesFetched
        ? <ArticleView 
            article={article}
            user={user}
            selectArticleToEdit={selectArticleToEdit}
            deleteArticle={deleteArticle}
          />
        : <div>Loading...</div>
      }
      
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...articleActions,
      ...articleFormActions,
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

export default connect(mapStateToProps, mapDispatchToProps)(Article)

