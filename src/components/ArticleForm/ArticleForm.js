import moment from 'moment'
import ArticleTextEditor from '../ArticleTextEditor/ArticleTextEditor'

import history from '../../history'

import './ArticleForm.css'

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
  articleError,
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
        date: articleDate || moment().format('Do MMMM YYYY'),
        summary: articleSummary,
        is_main: articleIsMain,
        content: articleContent
      }
    }
    submitArticle(body)
  }

  return (
    <form className='article-form' onSubmit={handleSubmit}>
      <div className='article-form-header-container'>
        <h3>{formName}</h3>
      </div>
      <div className='input-container'>
        <label className='article-form-label' htmlFor='title'>Title</label>
        <input
          className='article-form-input'
          id='title'
          type='text'
          value={articleTitle}
          name='title'
          onChange={onTitleChange}
          required
        />
      </div>
      <div className='input-container'>
        <label className='article-form-label' htmlFor='author'>Author</label>
        <input
          className='article-form-input'
          id='author'
          type='text'
          value={articleAuthor}
          name='author'
          onChange={onAuthorChange}
          required
        />
      </div>
      <div className='input-container'>
        <label className='article-form-label' htmlFor='image-url'>Image Url</label>
        <input
          className='article-form-input'
          id='image-url'
          type='text'
          value={articleImgUrl}
          name='image-url'
          onChange={onImgUrlChange}
          required
        />
      </div>
      <div className='input-container'>
        <label htmlFor='summary'>Summary</label>
        <textarea
          className='summary'
          id='summary'
          type='text'
          value={articleSummary}
          name='summary'
          onChange={onSummaryChange}
          required
        />
      </div>
      <div className='is-main-container'>
        <label htmlFor='is-main'>Main Article?</label>
        <input
          className='is-main'
          id='is-main'
          type='checkbox'
          checked={articleIsMain}
          value={articleIsMain}
          name='is-main'
          onChange={onIsMainChange}
        />
      </div>
      <div className='article-form-text-editor'>
        <div className='content-label'>
          <p>Content</p>
        </div>
          <ArticleTextEditor 
            saveArticleContent={saveArticleContent}
            articleContent={articleContent}
          />
      </div>
      {
        articleError && (
          <p className='article-error'>{articleError}</p>
        )
      }
      <div className='article-form-submit-container'>
        <input className='submit-button' type='submit' value='Submit'></input>
        <button className='submit-button' onClick={() => history.goBack()}>Cancel</button>
      </div>
    </form>
  );
};

export default ArticleForm
