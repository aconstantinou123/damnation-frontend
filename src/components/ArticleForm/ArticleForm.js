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
  submitArticle,
  articleTitle,
  articleAuthor,
  articleImgUrl,
  articleSummary,
  articleIsMain,
  articleContent,
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

  const onIsMainChange = (e) => {
    saveArticleIsMain()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      article: {
        title: articleTitle,
        author: articleAuthor,
        img_url: articleImgUrl,
        img_alt: 'alt',
        date: moment().format('MMMM Do YYYY'),
        summary: articleSummary,
        is_main: false,
        content: articleContent
      }
    }
    submitArticle(body)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create new article</h3>
      <div className="input-container">
        <label for="title">Title</label>
        <input
          id="title"
          type="text"
          value={articleTitle}
          name="title"
          onChange={onTitleChange}
        />
      </div>
      <div className="input-container">
        <label for="author">Author</label>
        <input
          id="author"
          type="text"
          value={articleAuthor}
          name="author"
          onChange={onAuthorChange}
        />
      </div>
      <div className="input-container">
        <label for="image-url">Image Url</label>
        <input
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
          value={articleIsMain}
          name="is-main"
          onChange={onIsMainChange}
        />
      </div>
      <div className="content-label">
        <p>Content</p>
      </div>
      <ArticleTextEditor saveArticleContent={saveArticleContent} />
      <input type="submit" value="Submit"></input>
    </form>
  );
};

export default ArticleForm
