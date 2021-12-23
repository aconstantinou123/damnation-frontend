import { useState } from 'react'
import ArticleContent from '../ArticleContent/ArticleContent'
import Button from '../Button/Button'
import Loading from '../Loading/Loading'
import Modal from '../Modal/Modal'

import history from '../../history'
import { APP_URL } from '../../constants/types'

import './ArticleView.css'

const ArticleView = ({ 
  article,
  selectArticleToEdit,
  user,
  deleteArticle,
  location,
  externalFile,
  externalFileFetching,
}) => {
  const [showModal, setShowModal] = useState(false)
  const handleEditClicked = () => {
    selectArticleToEdit(article)
    history.push(`/edit/${article.id}`)
  }

  const handleDeleteClicked = () => {
    setShowModal(!showModal)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const handleModalAction = () => {
    deleteArticle(article.id)
  }

  const handleBackClicked = () => {
    history.push(location)
  }

  const handleArticleLinkClicked = () => {
    const w = window.open('about:blank')
    if(article.filename.includes('pdf')) {
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

  const renderArticleType = () => {
    if(article.content){
      return <ArticleContent articleContent={article.content}/>
    } else if(externalFileFetching){
      return <Loading isSmall/>
    } else if(article.filename.includes('mp3') || article.filename.includes('wav')) {
      const mimeType = `audio/${article.filename.split('.')[1]}`
      return (
        <div className='media-container'>
          <audio 
            className='audio-player' 
            controls 
            src={`${APP_URL}/api/files/${article.filename}`} 
            type={mimeType}
          />
        </div>
      )
    } else if(article.filename.includes('mp4')) {
      const mimeType = `video/${article.filename.split('.')[1]}`
      return (
        <div className='media-container'>
          <video 
            className='video-player' 
            controls 
            src={`${APP_URL}/api/files/${article.filename}`} 
            type={mimeType} 
          />
        </div>
      )
    }
    const externalFileText = `${article.author} has provided Damnation their work in a special format. `
    return (
      <p className='article-link'>{externalFileText}
        <span className='article-highlight' onClick={handleArticleLinkClicked}>Please click here to view it</span>
      </p>
    )
  }

  return (
    <div className="article-view" key={article.id}>
        <Button onClick={handleBackClicked} name='Back'/>
        {
          user &&
          <>
            <Button onClick={handleEditClicked} name='Edit Article'/>
            <Button onClick={handleDeleteClicked} name='Delete Article'/>
          </>
        }
      <div className='article-view-content-container'>
        <div className='article-view-content'>
          <h3>{article.title}</h3>
          <p>By {article.author} {article.date}</p>  
          <div>
            <img className="article-view-img" src={article.img_url} alt={article.img_alt} />
          </div>
          {renderArticleType()}
        </div>
      </div>
      
      {
        showModal &&
        <Modal
          handleClose={handleModalClose}
          modalAction={handleModalAction}
          text='Are you sure?'    
        />
      }
    </div>
  )
}

export default ArticleView