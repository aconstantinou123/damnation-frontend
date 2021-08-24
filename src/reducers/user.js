import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from '../constants/types'

const defaultState = {
  userFetching: false,
  userFetched: false,
  user: null,
  userError: null,
  token: '',
  logoutPending: false,
  logoutError: null
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        userFetching: true,
        userFetched: false,
        user: null,
        userError: null,
        token: '',
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        userFetching: false,
        userFetched: true,
        user: action.payload.user,
        userError: null,
        token: action.payload.token,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        userFetching: false,
        userFetched: false,
        user: null,
        userError: action.payload,
        token: null,
      }
    case LOGOUT_PENDING:
      return {
        ...state,
        logoutPending: true,
        logoutError: null,
      }
    case LOGOUT_SUCCESS:
      return {
        userFetching: false,
        userFetched: false,
        user: null,
        userError: null,
        token: '',
        logoutPending: false,
        logoutError: null
      }
    case LOGOUT_ERROR:
      return {
        ...state,
        logoutPending: false,
        logoutError: action.payload,
      }
    default:
      return state
  }
}

export default userReducer