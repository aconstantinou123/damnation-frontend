import moment from 'moment'
import ArticleTextEditor from "../ArticleTextEditor/ArticleTextEditor"

import "./ArticleForm.css"

const ArticleForm = ({
  saveArticleTitle,
  saveArticleAuthor,
  saveArticleImgUrl,
  saveArticleSummary,
  saveArticleIsMain,
  saveArticleContent,
  articleId,
  articleDate,
  submitArticle,
  articleTitle,
  articleAuthor,
  articleImgUrl,
  articleSummary,
  articleIsMain,
  articleContent,
  formName,
}) => {
  const onTitleChange = (e) => {
    saveArticleTitle(e.target.value)
  };

  const onAuthorChange = (e) => {
    saveArticleAuthor(e.target.value)
  };

  const onImgUrlChange = (e) => {
    saveArticleImgUrl(e.target.value)
  };

  const onSummaryChange = (e) => {
    saveArticleSummary(e.target.value)
  }

  const onIsMainChange = () => {
    saveArticleIsMain()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      article: {
        id: articleId, 
        title: articleTitle,
        author: articleAuthor,
        img_url: articleImgUrl,
        img_alt: 'alt',
        date: articleDate || moment().format('MMMM Do YYYY'),
        summary: articleSummary,
        is_main: articleIsMain,
        content: articleContent
      }
    }
    submitArticle(body)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{formName}</h3>
      <div className="input-container">
        <label className="article-form-label" for="title">Title</label>
        <input
          className="article-form-input"
          id="title"
          type="text"
          value={articleTitle}
          name="title"
          onChange={onTitleChange}
        />
      </div>
      <div className="input-container">
        <label className="article-form-label" for="author">Author</label>
        <input
          className="article-form-input"
          id="author"
          type="text"
          value={articleAuthor}
          name="author"
          onChange={onAuthorChange}
        />
      </div>
      <div className="input-container">
        <label className="article-form-label" for="image-url">Image Url</label>
        <input
          className="article-form-input"
          id="image-url"
          type="text"
          value={articleImgUrl}
          name="image-url"
          onChange={onImgUrlChange}
        />
      </div>
      <div className="input-container">
        <label for="summary">Summary</label>
        <textarea
          className="summary"
          id="summary"
          type="text"
          value={articleSummary}
          name="summary"
          onChange={onSummaryChange}
        />
      </div>
      <div className="is-main-container">
        <label for="is-main">Main Article?</label>
        <input
          className="is-main"
          id="is-main"
          type="checkbox"
          checked={articleIsMain}
          value={articleIsMain}
          name="is-main"
          onChange={onIsMainChange}
        />
      </div>
      <div className="content-label">
        <p>Content</p>
      </div>
      <ArticleTextEditor 
        saveArticleContent={saveArticleContent}
        articleContent={articleContent}
      />
      <input className='submit-button' type="submit" value="Submit"></input>
    </form>
  );
};

export default ArticleForm
