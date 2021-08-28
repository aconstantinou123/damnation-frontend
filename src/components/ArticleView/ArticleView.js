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
  return (
    <div className="article-view" key={article.id}>
      <div className='article-button-container'>
        <Button onClick={handleBackClicked} name='Back'/>
        {
          user &&
          <>
            <Button onClick={handleEditClicked} name='Edit Article'/>
            <Button onClick={handleDeleteClicked} name='Delete Article'/>
          </>
        }
      </div>
      <h3>{article.title}</h3>
      <p>By {article.author} {article.date}</p>  
      <div>
        <img className="article-view-img" src={article.img_url} alt={article.img_alt} />
      </div>
      {/* <p>{article.content}</p> */}
      <ArticleContent articleContent={article.content}/>
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