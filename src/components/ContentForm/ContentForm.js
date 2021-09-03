import ArticleTextEditor from '../ArticleTextEditor/ArticleTextEditor'

import history from '../../history'

import './ContentForm.css'

const ContentForm = ({
  saveContentTitle,
  saveContentText,
  submitContent,
  content,
  formName,
  resetContentState,
  contentError,
}) => {
  const onTitleChange = (e) => {
    saveContentTitle(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      content: {
        id: content.id, 
        title: content.title,
        content: content.content,
      }
    }
    submitContent(body)
    resetContentState()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{formName}</h3>
      <div className='content-form-input-container'>
        <label className='content-form-label' for='title'>Title</label>
        <input
          className='content-form-input'
          id='title'
          type='text'
          value={content.title}
          name='title'
          onChange={onTitleChange}
          required
        />
      </div>
      <ArticleTextEditor 
        saveArticleContent={saveContentText}
        articleContent={content.content}
      />
      {
        contentError && (
          <p className='content-error'>{contentError}</p>
        )
      }
      <div className='content-form-submit-container'>
        <input className='content-form-submit-button' type='submit' value='Submit'></input>
        <button className='content-form-submit-button' onClick={() => history.goBack()}>Cancel</button>
      </div>
    </form>
  );
};

export default ContentForm
