import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import "./CreateArticle.css";

import ArticleForm from "../../components/ArticleForm/ArticleForm"

import * as articleActions from '../../actions/articleActions'
import * as articleFormActions from '../../actions/articleFormActions'

const CreateArticle = ({
  setIsExternalFile,
  setFileUploaded,
  saveArticleTitle,
  saveArticleAuthor,
  saveArticleImgUrl,
  saveArticleSummary,
  saveArticleIsMain,
  saveArticleContent,
  saveArticleFile,
  submitArticleCreate,
  selectedFile,
  articleId,
  articleDate,
  articleTitle,
  articleAuthor,
  articleImgUrl,
  articleSummary,
  articleIsMain,
  articleContent,
  articleError,
  articleFileUploaded,
  articleIsExternalFile,
  articleFileName,
  articleFileError,
  articleSubmitting,
  articleFileSaving,
}) => {
  return (
    <div className="create-article-container">
      <ArticleForm
        formName='Create new article'
        setIsExternalFile={setIsExternalFile}
        setFileUploaded={setFileUploaded}
        saveArticleTitle={saveArticleTitle}
        saveArticleAuthor={saveArticleAuthor}
        saveArticleImgUrl={saveArticleImgUrl}
        saveArticleSummary={saveArticleSummary}
        saveArticleIsMain={saveArticleIsMain}
        saveArticleContent={saveArticleContent}
        saveArticleFile={saveArticleFile}
        submitArticle={submitArticleCreate}
        selectedFile={selectedFile}
        articleId={articleId}
        articleDate={articleDate}
        articleTitle={articleTitle}
        articleAuthor={articleAuthor}
        articleImgUrl={articleImgUrl}
        articleSummary={articleSummary}
        articleIsMain={articleIsMain}
        articleContent={articleContent}
        articleError={articleError}
        articleFileUploaded={articleFileUploaded}
        articleIsExternalFile={articleIsExternalFile}
        articleFileName={articleFileName}
        articleFileError={articleFileError}
        articleSubmitting={articleSubmitting}
        articleFileSubmitting={articleFileSaving}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle)

