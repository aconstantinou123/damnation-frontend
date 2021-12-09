import {
  FETCH_ARTICLES_PENDING,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  FETCH_ARTICLE_PENDING,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_ERROR,
  FETCH_EXTERNAL_FILE_PENDING,
  FETCH_EXTERNAL_FILE_SUCCESS,
  FETCH_EXTERNAL_FILE_ERROR,
  FETCH_MAIN_ARTICLE_PENDING,
  FETCH_MAIN_ARTICLE_SUCCESS,
  FETCH_MAIN_ARTICLE_ERROR,
  SET_CURRENT_PAGE,
  SET_ARTICLE_TO_VIEW,
  SET_SEARCH_VALUE,
  RESET_ARTICLE_FETCHED_STATE,
  RESET_MAIN_ARTICLE_STATE,
  SET_LOCATION,
  SET_DATE,
  RESET_DATE,
  SET_FILE_UPLOADED,
} from '../constants/types'

const defaultState = {
  articles: [],
  mainArticle: [],
  articleCount: null,
  currentPage: 1,
  currentArticle: null,
  articlesFetching: false,
  articlesFetched: false,
  articlesError: null,
  articleFetching: false,
  articleFetched: false,
  articleError: null,
  externalFileFetching: false,
  externalFileFetched: false,
  externalFile: null,
  externalFileError: null,
  mainArticleFetching: false,
  mainArticleFetched: false,
  mainArticleError: null,
  searchValue: '',
  location: '/',
  date: '',
}

const articleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_PENDING:
      return {
        ...state,
        articles: [],
        articleCount: null,
        articlesFetching: true,
        articlesFetched: false,
        articlesError: null,
      }
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload.data,
        articleCount: action.payload.count + state.mainArticle.length,
        articlesFetching: false,
        articlesFetched: true,
        articlesError: null,
      }
    case FETCH_ARTICLES_ERROR:
      return {
        ...state,
        articles: [],
        articleCount: null,
        articlesFetching: false,
        articlesFetched: false,
        articlesError: action.payload,
      }
    case FETCH_EXTERNAL_FILE_PENDING:
      return {
        ...state,
        externalFileFetching: true,
        externalFileFetched: false,
        externalFile: null,
        externalFileError: null,
      }
    case FETCH_EXTERNAL_FILE_SUCCESS:
      return {
        ...state,
        externalFileFetching: false,
        externalFileFetched: true,
        externalFile: action.payload,
        externalFileError: null,
      }
    case FETCH_EXTERNAL_FILE_ERROR:
      return {
        ...state,
        externalFileFetching: false,
        externalFileFetched: false,
        externalFile: null,
        externalFileError: action.payload,
      }
    case SET_FILE_UPLOADED:
      return {
        ...state,
        externalFileFetching: false,
        externalFileFetched: false,
        externalFile: null,
        externalFileError: null,
      }
    case FETCH_MAIN_ARTICLE_PENDING:
      return {
        ...state,
        mainArticleFetching: true,
        mainArticleFetched: false,
        mainArticleError: null,
      }
    case FETCH_MAIN_ARTICLE_SUCCESS:
      return {
        ...state,
        mainArticleFetching: false,
        mainArticleFetched: true,
        mainArticle: action.payload.data,
        articleCount: state.articleCount + action.payload.count,
        mainArticleError: null,
      }
    case FETCH_MAIN_ARTICLE_ERROR:
      return {
        ...state,
        mainArticleFetching: false,
        mainArticleFetched: false,
        mainArticleError: action.payload,
      }
    case RESET_MAIN_ARTICLE_STATE:
      return {
        ...state,
        mainArticleFetching: false,
        mainArticleFetched: false,
        mainArticleError: null,
        mainArticle: []
      }
    case RESET_ARTICLE_FETCHED_STATE:
      return {
        ...state,
        articlesFetching: false,
        articlesFetched: false,
        articlesError: null,
      }
    case FETCH_ARTICLE_PENDING:
      return {
        ...state,
        currentArticle: null,
        articleFetching: true,
        articleFetched: false,
        articleError: null,
      }
    case FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        currentArticle: action.payload,
        articleFetching: false,
        articleFetched: true,
        articleError: null,
      }
    case FETCH_ARTICLE_ERROR:
      return {
        ...state,
        currentArticle: null,
        articleFetching: false,
        articleFetched: false,
        articleError: action.payload,
      }
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      }
    case SET_ARTICLE_TO_VIEW:
      return {
        ...state,
        currentArticle: action.payload,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      }
    case SET_DATE:
      return {
        ...state,
        date: action.payload,
      }
    case RESET_DATE:
      return {
        ...state,
        date: '',
      }
    default:
      return state
  }
}

export default articleReducer