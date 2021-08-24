import { 
  DELETE_ARTICLE_PENDING,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_ERROR,
  SAVE_ARTICLE_CONTENT,
  SAVE_ARTICLE_TITLE,
  SAVE_ARTICLE_AUTHOR,
  SAVE_ARTICLE_SUMMARY,
  SAVE_ARTICLE_IS_MAIN,
  SAVE_ARTICLE_IMG_URL,
  SELECT_ARTICLE_TO_EDIT,
  SUBMIT_CREATE_ARTICLE_PENDING,
  SUBMIT_CREATE_ARTICLE_SUCCESS,
  SUBMIT_CREATE_ARTICLE_ERROR,
} from '../constants/types'

const defaultState = {
  articleId: null,
  articleDate: '',
  articleTitle: '',
  articleAuthor: '',
  articleImgUrl: '',
  articleSummary: '',
  articleIsMain: false,
  articleContent: null,
  articleSubmitting: false,
  articleSubmitted: false, 
  articleError: null,
  articleDeletePending: false,
  articleDeleteSuccess: false,
  articleDeleteError: null,
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
        articleId: '',
        articleDate: '',
        articleTitle: '',
        articleAuthor: '',
        articleImgUrl: '',
        articleSummary: '',
        articleIsMain: false,
        articleContent: null,
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
    case SELECT_ARTICLE_TO_EDIT:
      return {
        ...state,
        articleId: action.payload.id,
        articleDate: action.payload.date,
        articleTitle: action.payload.title,
        articleAuthor: action.payload.author,
        articleImgUrl: action.payload.img_url,
        articleSummary: action.payload.summary,
        articleIsMain: action.payload.is_main,
        articleContent: action.payload.content,
      }
    case DELETE_ARTICLE_PENDING:
      return {
        ...state,
        articleDeletePending: true,
        articleDeleteSuccess: false,
        articleDeleteError: null,
      }
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        articleDeletePending: false,
        articleDeleteSuccess: true,
        articleDeleteError: null,
      }
    case DELETE_ARTICLE_ERROR:
      return {
        ...state,
        articleDeletePending: false,
        articleDeleteSuccess: false,
        articleDeleteError: action.payload,
      }
    default:
      return state
  }
}

export default createArticleReducer