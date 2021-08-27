import ArticleContent from '../ArticleContent/ArticleContent'
import Button from '../Button/Button'
import Header from '../Header/Header'

import history from '../../history'

import './ContentView.css'

const ContentView = ({ 
  content,
  selectContentToEdit,
  user,
}) => {
  const handleEditClicked = () => {
    selectContentToEdit(content)
    history.push(`/content/${content.id}`)
  }

  return (
    <div className="copy-view" key={content.id}>
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
      <h3>{content.title}</h3>
      <div className='copy-content'>
        <ArticleContent articleContent={content.content}/>
      </div>
    </div>
  )
}

export default ContentView