import ArticleContent from '../ArticleContent/ArticleContent'
import Button from '../Button/Button'

import history from '../../history'

import './ArticleView.css'

const ArticleView = ({ 
  article,
  selectArticleToEdit,
  user,
  deleteArticle
}) => {
  const handleEditClicked = () => {
    selectArticleToEdit(article)
    history.push(`/edit/${article.id}`)
  }

  const handleDeleteClicked = () => {
    deleteArticle(article.id)
  }
  return (
    <div className="article-view" key={article.id}>
      <div className='article-button-container'>
        <Button onClick={() => history.push('/')} name='Back'/>
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
    </div>
  )
}

export default ArticleView