import ArticleContent from '../ArticleContent/ArticleContent'
import Button from '../Button/Button'
import Header from '../Header/Header'

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
        <Header
          user={user}
        />
        <Button onClick={() => history.push('/')} name='Back'/>
        {
          user &&
          <>
            <Button onClick={handleEditClicked} name='Edit Content'/>
          </>
        }
      </div>
      <h3>{copy.title}</h3>
      <div className='copy-content'>
        <ArticleContent articleContent={copy.content}/>
      </div>
    </div>
  )
}

export default CopyView