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
    selectContentToEdit(content);
    history.push(`/content/${content.id}`)
  };

  return (
    <div className='copy-view' key={content.id}>
      <Header user={user} />
      {fetchedContent && content.content ? (
        <>
          <Button onClick={() => history.push('/')} name='Back' />
          {user && (
            <>
              <Button onClick={handleEditClicked} name='Edit Content' />
            </>
          )}
          <div className='copy-content-container'>
            <div className='copy-content'>
              <h3 className='content-title'>{content.title}</h3>
              <ArticleContent articleContent={content.content} />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default ContentView
