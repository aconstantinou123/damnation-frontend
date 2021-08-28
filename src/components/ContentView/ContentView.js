import ArticleContent from '../ArticleContent/ArticleContent'
import Button from '../Button/Button'
import Header from '../Header/Header'
import Loading from '../Loading/Loading'

import history from '../../history'

import './ContentView.css'

const ContentView = ({ 
  content,
  selectContentToEdit,
  user,
  fetchedContent,
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
            </div>
            {
              (fetchedContent && content.content) ? (
                <>
              <Button onClick={() => history.push('/')} name='Back'/>
              {
                user &&
                <>
                  <Button onClick={handleEditClicked} name='Edit Content'/>
                </>
              }
            <h3>{content.title}</h3>
            <div className='copy-content'>
              <ArticleContent articleContent={content.content}/>
            </div>
          </>
        ) : (
            <Loading/>
        )
      }
    </div>
  )
}

export default ContentView