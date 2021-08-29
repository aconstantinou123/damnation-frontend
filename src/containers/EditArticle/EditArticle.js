import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import "./EditArticle.css";

import ArticleForm from "../../components/ArticleForm/ArticleForm"

import * as articleActions from '../../actions/articleActions'
import * as articleFormActions from '../../actions/articleFormActions'

const EditArticle = ({ 
  saveArticleTitle,
  saveArticleAuthor,
  saveArticleImgUrl,
  saveArticleSummary,
  saveArticleIsMain,
  saveArticleContent,
  submitArticleEdit,
  articleId,
  articleDate,
  articleTitle,
  articleAuthor,
  articleImgUrl,
  articleSummary,
  articleIsMain,
  articleContent,
  articleError,
}) => {
  return (
    <div className="edit-article-container">
      <ArticleForm
        formName='Edit article'
        saveArticleTitle={saveArticleTitle}
        saveArticleAuthor={saveArticleAuthor}
        saveArticleImgUrl={saveArticleImgUrl}
        saveArticleSummary={saveArticleSummary}
        saveArticleIsMain={saveArticleIsMain}
        saveArticleContent={saveArticleContent}
        submitArticle={submitArticleEdit}
        articleId={articleId}
        articleDate={articleDate}
        articleTitle={articleTitle}
        articleAuthor={articleAuthor}
        articleImgUrl={articleImgUrl}
        articleSummary={articleSummary}
        articleIsMain={articleIsMain}
        articleContent={articleContent}
        articleError={articleError}
      />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle)

