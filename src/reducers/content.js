import {
  FETCH_CONTENT_PENDING,
  FETCH_CONTENT_SUCCESS,
  FETCH_CONTENT_ERROR,
  SET_CONTENT_TO_EDIT,
  SAVE_CONTENT_TITLE,
  SAVE_CONTENT_TEXT,
  SUBMIT_EDIT_CONTENT_PENDING,
  SUBMIT_EDIT_CONTENT_SUCCESS,
  SUBMIT_EDIT_CONTENT_ERROR,
  RESET_CONTENT_STATE,
} from '../constants/types'

const defaultState = {
  fetchingContent: false,
  fetchedContent: false,
  contentError: null,
  content: {
    submissions: {}
  },
  contentToEdit: {},
  editContentPending: false,
  editContentSuccess: false,
  editContentError: null,
}

const contentReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_CONTENT_PENDING:
      return {
        ...state,
        fetchingContent: true,
        fetchedContent: false,
        contentError: null,
        content: {
          ...state.content,
          submissions: {}
        }
      }
    case FETCH_CONTENT_SUCCESS:
      return {
        ...state,
        fetchingContent: false,
        fetchedContent: true,
        contentError: null,
        content: {
          ...state.content,
          submissions: action.payload
            .find(content => content.type === 'submissions')
        }
      }
    case FETCH_CONTENT_ERROR:
      return {
        ...state,
        fetchingContent: false,
        fetchedContent: false,
        contentError: action.payload,
        content: {
          ...state.content,
          submissions: {}
        }
      }
    case SUBMIT_EDIT_CONTENT_PENDING:
      return {
        ...state,
        editContentPending: true,
        editContentSuccess: false,
        editContentError: null,
        content: {
          ...state.content,
          submissions: {}
        }
      }
    case SUBMIT_EDIT_CONTENT_SUCCESS:
      return {
        ...state,
        editContentPending: false,
        editContentSuccess: true,
        editContentError: null,
      }
    case SUBMIT_EDIT_CONTENT_ERROR:
      return {
        ...state,
        editContentPending: false,
        editContentSuccess: false,
        editContentError: action.payload,
        content: {
          ...state.content,
          submissions: {},
        }
      }
    case SET_CONTENT_TO_EDIT:
      return {
        ...state,
        contentToEdit: action.payload,
      }
    case SAVE_CONTENT_TITLE:
      return {
        ...state,
        contentToEdit: {
          ...state.contentToEdit,
          title: action.payload,
        }
      }
    case SAVE_CONTENT_TEXT:
      return {
        ...state,
        contentToEdit: {
          ...state.contentToEdit,
          content: action.payload,
        }
      }
    case RESET_CONTENT_STATE:
      return {
        fetchingContent: false,
        fetchedContent: false,
        contentError: null,
        content: {
          ...state.content,
          submissions: {}
        },
        contentToEdit: {},
        editContentPending: false,
        editContentSuccess: false,
        editContentError: null,
      }
    default:
      return state
  }
}

export default contentReducer