import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { useEffect } from 'react'

import './Article.css';

import ArticleView from '../../components/ArticleView/ArticleView'
import Loading from '../../components/Loading/Loading'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

import * as articleActions from '../../actions/articleActions'
import * as articleFormActions from '../../actions/articleFormActions'

const Article = ({ 
  articleFetched,
  selectArticleToEdit,
  deleteArticle,
  articleSubmitted,
  user,
  currentArticle,
  fetchArticle,
  fetchExternalFile,
  externalFile,
  resetSubmit,
  location,
}) => {

  const { id } = useParams()
  useEffect(() => {
    if (!currentArticle) {
      fetchArticle(id);
    }
    
  }, [fetchArticle, currentArticle, id]);

  useEffect(() => {
    if (currentArticle && currentArticle.filename) {
      fetchExternalFile(currentArticle.filename)
    }
    
  }, [currentArticle, fetchExternalFile]);


  useEffect(() => {
    if (articleSubmitted) {
      fetchArticle(id)
      resetSubmit()
    }
  }, [fetchArticle, currentArticle, id, articleSubmitted, resetSubmit]);
  return (
    <>
      <div className='article-page'>
        <div className='article-container'>
          <Header/>
          {
            articleFetched || currentArticle
            ? <ArticleView 
                article={currentArticle}
                user={user}
                externalFile={externalFile}
                selectArticleToEdit={selectArticleToEdit}
                deleteArticle={deleteArticle}
                location={location}
              />
            : <Loading/>
          }
        </div>
      </div>
      <Footer/>
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...articleActions,
      ...articleFormActions,
    },
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    ...state.articleReducer,
    ...state.articleFormReducer,
    ...state.userReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)

