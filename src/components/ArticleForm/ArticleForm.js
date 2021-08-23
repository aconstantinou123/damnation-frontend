import ArticleTextEditor from "../ArticleTextEditor/ArticleTextEditor"

import './ArticleForm.css'

const ArticleForm = ({ saveArticleContent }) => {

  return (
    <div>
      <h3>Create new article</h3>
      <div className="input-container">
        <label for="title">Title</label>
        <input id="title" type="text" value="" name="title"/>
      </div>
      <div className="input-container">
        <label for="author">Author</label>
        <input id="author" type="text" value="" name="author"/>
      </div>
      <div className="input-container">
        <label for="summary">Summary</label>
        <textarea className="summary" id="summary" type="text" value="" name="summary"/>
      </div>
      <div className="is-main-container">
        <label for="is-main">Main Article?</label>
        <input className="is-main" id="is-main" type="checkbox" value="" name="is-main"/>
      </div>
      <div className="content-label">
        <p>Content</p>
      </div>
      <ArticleTextEditor
        saveArticleContent={saveArticleContent}
      />
    </div>
  )
}

export default ArticleForm