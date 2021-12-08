import ArticleContent from '../ArticleContent/ArticleContent'
import Button from '../Button/Button'

import history from '../../history'

import './ArticleView.css'
import { useState } from 'react'
import Modal from '../Modal/Modal'

const ArticleView = ({ 
  article,
  selectArticleToEdit,
  user,
  deleteArticle,
  location,
  externalFile
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
    const data = `data:image/jpeg;charset=utf-8;base64,${externalFile}`
    const w = window.open('about:blank')
    const image = new Image()
    image.src = data
    setTimeout(function(){
      w.document.write(image.outerHTML)
    }, 0)
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
          {
            article.content ? (
              <ArticleContent articleContent={article.content}/>
            ) : (
              <Button onClick={handleArticleLinkClicked} name='View Article'/>
            )
          }
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