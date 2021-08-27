import {
  FETCH_ARTICLE_DATES_PENDING,
  FETCH_ARTICLE_DATES_SUCCESS,
  FETCH_ARTICLE_DATES_ERROR,
  SET_ARCHIVE_LOCATION,
} from '../constants/types'


const defaultState = {
  archiveDates: [],
  archiveDatesFetching: false,
  archiveDatesFetched: false,
  archiveDatesError: null,
  archiveLocation: ''
}

const archiveReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_ARTICLE_DATES_PENDING:
      return {
        ...state,
        archiveDates: [],
        archiveDatesFetching: true,
        archiveDatesFetched: false,
        archiveDatesError: null
      }
    case FETCH_ARTICLE_DATES_SUCCESS:
      return {
        ...state,
        archiveDates: action.payload,
        archiveDatesFetching: false,
        archiveDatesFetched: true,
        archiveDatesError: null
      }
    case FETCH_ARTICLE_DATES_ERROR:
      return {
        ...state,
        archiveDates: [],
        archiveDatesFetching: false,
        archiveDatesFetched: false,
        archiveDatesError: null
      }
    case SET_ARCHIVE_LOCATION:
      return {
        ...state,
        archiveLocation: action.payload,
      }
    default:
      return state
  }
}

export default archiveReducer