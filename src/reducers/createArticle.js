import { 
  SAVE_ARTICLE_CONTENT,
  SAVE_ARTICLE_TITLE,
  SAVE_ARTICLE_AUTHOR,
  SAVE_ARTICLE_SUMMARY,
  SAVE_ARTICLE_IS_MAIN,
  SAVE_ARTICLE_IMG_URL,
  SUBMIT_CREATE_ARTICLE_PENDING,
  SUBMIT_CREATE_ARTICLE_SUCCESS,
  SUBMIT_CREATE_ARTICLE_ERROR,
} from '../constants/types'

const defaultState = {
  articleTitle: '',
  articleAuthor: '',
  articleImgUrl: '',
  articleSummary: '',
  articleIsMain: false,
  articleContent: {},
  articleSubmitting: false,
  articleSubmitted: false, 
  articleError: null,
}

const createArticleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_ARTICLE_TITLE:
      return {
        ...state,
        articleTitle: action.payload,
      }
    case SAVE_ARTICLE_AUTHOR:
      return {
        ...state,
        articleAuthor: action.payload,
      }
    case SAVE_ARTICLE_IMG_URL:
      return {
        ...state,
        articleImgUrl: action.payload,
      }
    case SAVE_ARTICLE_SUMMARY:
      return {
        ...state,
        articleSummary: action.payload,
      }
    case SAVE_ARTICLE_IS_MAIN:
      return {
        ...state,
        articleIsMain: !state.articleIsMain,
      }
    case SAVE_ARTICLE_CONTENT:
      return {
        ...state,
        articleContent: action.payload,
      }
    case SUBMIT_CREATE_ARTICLE_PENDING:
      return {
        ...state,
        articleSubmitting: true,
        articleSubmitted: false,
        articleError: null,
      }
    case SUBMIT_CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        articleTitle: '',
        articleAuthor: '',
        articleImgUrl: '',
        articleSummary: '',
        articleIsMain: false,
        articleContent: {},
        articleSubmitting: false,
        articleSubmitted: true,
        articleError: null,
      }
    case SUBMIT_CREATE_ARTICLE_ERROR:
      return {
        ...state,
        articleSubmitting: false,
        articleSubmitted: false,
        articleError: action.payload,
      }
    default:
      return state
  }
}

export default createArticleReducer