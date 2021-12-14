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
              <p className='article-link' onClick={handleArticleLinkClicked}>{article.author} has provided Damnation their work in a special format. Please click here to view it</p>
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