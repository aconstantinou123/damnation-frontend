import moment from 'moment'

import ArticleTextEditor from '../ArticleTextEditor/ArticleTextEditor'
import FileUploadPage from '../FileUpload/FileUpload'
import Loading from '../Loading/Loading'
import history from '../../history'

import './ArticleForm.css'

const ArticleForm = ({
  setFileUploaded,
  setIsExternalFile,
  saveArticleTitle,
  saveArticleAuthor,
  saveArticleImgUrl,
  saveArticleSummary,
  saveArticleIsMain,
  saveArticleContent,
  saveArticleFile,
  selectedFile,
  externalFile,
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
  articleFileUploaded,
  articleIsExternalFile,
  articleFileName,
  articleFileError,
  articleSubmitting,
  articleFileSubmitting,
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

  const onIsExternalChange = () => {
    setIsExternalFile()
  }

  const handleArticleLinkClicked = () => {
    const w = window.open('about:blank')
    if(articleFileName.includes('pdf')) {
      const data = `data:application/pdf;base64,${encodeURI(externalFile)}`
      w.document.write(
        `<iframe width='100%' height='100%' src='${data}'></iframe>`
      )
    } else {
      const data = `data:image/jpeg;charset=utf-8;base64,${externalFile}`
      const image = new Image()
      image.src = data
      setTimeout(function(){
        w.document.write(image.outerHTML)
      }, 0)
    }
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
        content: articleContent || null,
        filename: articleFileName || null,
      }
    }
    if(articleIsExternalFile || articleFileName) {
      saveArticleFile(body)
    } else {
      submitArticle(body)
    }
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
      <div className='is-main-container'>
        <label htmlFor='is-external'>Upload File?</label>
        <input
          className='is-main'
          id='is-external'
          type='checkbox'
          checked={articleIsExternalFile}
          value={articleIsExternalFile}
          name='is-external'
          onChange={onIsExternalChange}
        />
      </div>
      {
        (externalFile && articleIsExternalFile) && (
          <div className='current-file'>
            <p>Current file:</p>
            <p className='current-file-link' onClick={handleArticleLinkClicked}>{articleFileName} (Click to view)</p>
          </div>
        )
      }
      {
        !articleIsExternalFile ? (
          <div className='article-form-text-editor'>
            <div className='content-label'>
              <p>Content</p>
            </div>
              <ArticleTextEditor 
                saveArticleContent={saveArticleContent}
                articleContent={articleContent}
              />
          </div>
        ) : (
          <div className='file-upload-container'>
            {
              externalFile && <p>Select new file:</p>
            }
            <FileUploadPage
              setFileUploaded={setFileUploaded}
              articleFileUploaded={articleFileUploaded}
              selectedFile={selectedFile}
            />
          </div>
        )
      }
      {
        articleError && (
          <p className='article-error'>{articleError}</p>
        )
      }
      {
        articleFileError && (
          <p className='article-error'>{articleFileError}</p>
        )
      }
      <div className='article-form-submit-container'>
        {
          (articleFileSubmitting || articleSubmitting)
          ? <Loading isSmall/>
          : <>
              <input className='submit-button' type='submit' value='Submit'></input>
              <button type='button' className='submit-button' onClick={() => history.goBack()}>Cancel</button>
            </>
        }
      </div>
    </form>
  );
};

export default ArticleForm
