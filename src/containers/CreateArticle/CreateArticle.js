import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import "./CreateArticle.css";

import ArticleForm from "../../components/ArticleForm/ArticleForm"

import * as articleActions from '../../actions/articleActions'
import * as createArticleActions from '../../actions/createArticleActions'

const CreateArticle = ({ saveArticleContent }) => {
  return (
    <div className="create-article-container">
      <ArticleForm
        saveArticleContent={saveArticleContent}
      />
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...articleActions,
      ...createArticleActions,
    },
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    ...state.articleReducer,
    ...state.createArticleReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle)

