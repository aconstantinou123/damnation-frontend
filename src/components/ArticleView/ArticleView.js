import ArticleContent from '../ArticleContent/ArticleContent'

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
        <button onClick={() => history.push('/')} className="go-back">Back</button>
        {
          user &&
          <>
            <button onClick={handleEditClicked} className="edit-article">Edit Article</button>
            <button onClick={handleDeleteClicked} className="delete-article">Delete Article</button>
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