import { 
  DELETE_ARTICLE_PENDING,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_ERROR,
  DELETE_ARTICLE_FILE_PENDING,
  DELETE_ARTICLE_FILE_SUCCESS,
  DELETE_ARTICLE_FILE_ERROR,
  SET_FILE_UPLOADED,
  SET_IS_EXTERNAL_FILE,
  SAVE_ARTICLE_CONTENT,
  SAVE_ARTICLE_TITLE,
  SAVE_ARTICLE_AUTHOR,
  SAVE_ARTICLE_SUMMARY,
  SAVE_ARTICLE_IS_MAIN,
  SAVE_ARTICLE_IMG_URL,
  EDIT_ARTICLE_FILE_PENDING,
  EDIT_ARTICLE_FILE_SUCCESS,
  EDIT_ARTICLE_FILE_ERROR,
  SAVE_ARTICLE_FILE_PENDING,
  SAVE_ARTICLE_FILE_SUCCESS,
  SAVE_ARTICLE_FILE_ERROR,
  SELECT_ARTICLE_TO_EDIT,
  SUBMIT_CREATE_ARTICLE_PENDING,
  SUBMIT_CREATE_ARTICLE_SUCCESS,
  SUBMIT_CREATE_ARTICLE_ERROR,
  RESET_SUBMIT,
} from '../constants/types'

const defaultState = {
  articleId: null,
  articleDate: '',
  articleTitle: '',
  articleAuthor: '',
  articleImgUrl: '',
  articleSummary: '',
  articleIsExternalFile: false,
  articleIsMain: false,
  articleContent: null,
  articleSubmitting: false,
  articleSubmitted: false, 
  articleError: null,
  articleDeletePending: false,
  articleDeleteSuccess: false,
  articleDeleteError: null,
  articleFileUploaded: false,
  articleFileSaving: false,
  articleFileSaved: false,
  articleFileName: '',
  articleFileEditing: false,
  articleFileEdited: false,
  articleFileEditError: null,
  articleFileDeleting: false,
  articleFileDeleted: false,
  articleFileDeleteError: false,
  selectedFile: null,
  articleFileError: null
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
    case SET_IS_EXTERNAL_FILE:
      return {
        ...state,
        articleIsExternalFile: !state.articleIsExternalFile,
        articleContent: null,
        selectedFile: null,
      }
    case SET_FILE_UPLOADED:
      return {
        ...state,
        selectedFile: action.payload,
        articleFileUploaded: true,
      }
    case SAVE_ARTICLE_FILE_PENDING:
      return {
        ...state,
        articleFileSaving: true,
        articleFileSaved: false,
        articleFileError: null,
      }
    case SAVE_ARTICLE_FILE_SUCCESS:
      return {
        ...state,
        articleFileSaving: false,
        articleFileSaved: true,
        articleFileName: action.payload,
        articleFileError: null,
      }
    case SAVE_ARTICLE_FILE_ERROR:
      return {
        ...state,
        articleFileSaving: false,
        articleFileSaved: false,
        articleFileName: '',
        articleFileError: action.payload,
      }
    case EDIT_ARTICLE_FILE_PENDING:
      return {
        ...state,
        articleFileEditing: true,
        articleFileEdited: false,
        articleFileEditError: null,
      }
    case EDIT_ARTICLE_FILE_SUCCESS:
      return {
        ...state,
        articleFileEditing: false,
        articleFileEdited: true,
        articleFileName: action.payload,
        articleFileEditError: null,
      }
    case EDIT_ARTICLE_FILE_ERROR:
      return {
        ...state,
        articleFileEditing: false,
        articleFileEdited: false,
        articleFileName: '',
        articleFileEditError: action.payload,
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
        articleFileUploaded: false,
        articleFileName: '',
        selectedFile: null,
      }
    case SUBMIT_CREATE_ARTICLE_ERROR:
      return {
        ...state,
        articleSubmitting: false,
        articleSubmitted: false,
        articleError: action.payload,
      }
    case RESET_SUBMIT:
      return {
        ...state,
        articleSubmitting: false,
        articleSubmitted: false,
        articleError: null,
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
        articleFileName: action.payload.filename,
        articleIsExternalFile: !!action.payload.filename,

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
    case DELETE_ARTICLE_FILE_PENDING:
      return {
        ...state,
        articleFileDeleting: true,
        articleFileDeleted: false,
        articleFileDeleteError: null,
      }
    case DELETE_ARTICLE_FILE_SUCCESS:
      return {
        ...state,
        articleFileDeleting: false,
        articleFileDeleted: true,
        articleFileDeleteError: null,
      }
    case DELETE_ARTICLE_FILE_ERROR:
      return {
        ...state,
        articleFileDeleting: false,
        articleFileDeleted: false,
        articleFileDeleteError: action.payload,
      }
    default:
      return state
  }
}

export default createArticleReducer