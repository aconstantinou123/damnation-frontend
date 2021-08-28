import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { bindActionCreators } from "redux"
import { useEffect } from "react"

import "./Article.css";

import ArticleView from "../../components/ArticleView/ArticleView"
import Loading from "../../components/Loading/Loading"

import * as articleActions from '../../actions/articleActions'
import * as articleFormActions from '../../actions/articleFormActions'

const Article = ({ 
  articleFetched,
  selectArticleToEdit,
  deleteArticle,
  articleSubmitted,
  user,
  currentArticle,
  fetchArticle,
  resetSubmit,
  archiveLocation,
}) => {

  const { id } = useParams()
  useEffect(() => {
    if (!currentArticle) {
      fetchArticle(id);
    }
    
  }, [fetchArticle, currentArticle, id]);


  useEffect(() => {
    if (articleSubmitted) {
      fetchArticle(id)
      resetSubmit()
    }
  }, [fetchArticle, currentArticle, id, articleSubmitted, resetSubmit]);
  return (
    <div className="article-container">
      {
        articleFetched || currentArticle
        ? <ArticleView 
            article={currentArticle}
            user={user}
            selectArticleToEdit={selectArticleToEdit}
            deleteArticle={deleteArticle}
            location={archiveLocation}
          />
        : <Loading/>
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
    ...state.archiveReducer,
    ...state.userReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)

