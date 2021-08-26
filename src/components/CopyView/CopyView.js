import ArticleContent from '../ArticleContent/ArticleContent'

import history from '../../history'

import './CopyView.css'

const CopyView = ({ 
  copy,
  // selectArticleToEdit,
  user,
}) => {
  const handleEditClicked = () => {
    // selectArticleToEdit(article)
    // history.push(`/edit/${article.id}`)
  }

  return (
    <div className="copy-view" key={copy.id}>
      <div className='copy-button-container'>
        <button onClick={() => history.push('/')} className="go-back">Back</button>
        {
          user &&
          <>
            <button onClick={handleEditClicked} className="edit-article">Edit Copy</button>
          </>
        }
      </div>
      <h3>{copy.title}</h3>
      <ArticleContent articleContent={copy.content}/>
    </div>
  )
}

export default CopyView