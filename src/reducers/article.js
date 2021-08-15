import {
  FETCH_ARTICLES_PENDING,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
} from '../constants/types'

const defaultState = {
  articles: [],
  mainArticle: {},
  articlesFetching: false,
  articlesFetched: false,
  articlesError: null,
}

const articleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_PENDING:
      return {
        ...state,
        articles: [],
        articlesFetching: true,
        articlesFetched: false,
        articlesError: null,
      }
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        articlesFetching: false,
        articlesFetched: true,
        articlesError: null,
      }
    case FETCH_ARTICLES_ERROR:
      return {
        ...state,
        articles: [],
        articlesFetching: false,
        articlesFetched: false,
        articlesError: action.payload,
      }
    default:
      return state
  }
}

export default articleReducer