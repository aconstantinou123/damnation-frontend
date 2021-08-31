import {
  FETCH_ARTICLES_PENDING,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  FETCH_ARTICLE_PENDING,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_ERROR,
  FETCH_ARTICLE_COUNT_PENDING,
  FETCH_ARTICLE_COUNT_SUCCESS,
  FETCH_ARTICLE_COUNT_ERROR,
  RESET_ARTICLE_COUNT,
  SET_CURRENT_PAGE,
  SET_ARTICLE_TO_VIEW,
  SEARCH_ARTICLES_PENDING,
  SEARCH_ARTICLES_SUCCESS,
  SEARCH_ARTICLES_ERROR,
  SET_SEARCH_VALUE,
  RESET_SEARCH_FETCHED_STATE,
  RESET_ARTICLE_FETCHED_STATE,
} from '../constants/types'

const defaultState = {
  articles: [],
  mainArticle: {},
  articlesFetching: false,
  articlesFetched: false,
  articlesError: null,
  currentPage: 1,
  currentArticle: null,
  articleFetching: false,
  articleFetched: false,
  articleError: null,
  articleCountFetching: false,
  articleCountFetched: false,
  articleCountError: null,
  articleCount: null,
  searchArticlesFetching: false,
  searchArticlesFetched: false,
  searchArticlesError: null,
  searchValue: '',
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
    case FETCH_ARTICLE_COUNT_PENDING:
      return {
        ...state,
        articleCount: null,
        articleCountFetching: true,
        articleCountFetched: false,
        articleCountError: null,
      }
    case FETCH_ARTICLE_COUNT_SUCCESS:
      return {
        ...state,
        articleCount: action.payload,
        articleCountFetching: false,
        articleCountFetched: true,
        articleCountError: null,
      }
    case FETCH_ARTICLE_COUNT_ERROR:
      return {
        ...state,
        articleCount: null,
        articleCountFetching: false,
        articleCountFetched: false,
        articleCountError: action.payload,
      }
    case SEARCH_ARTICLES_PENDING:
      return {
        ...state,
        searchArticlesFetching: true,
        searchArticlesFetched: false,
        articles:[],
        searchArticlesError: null,
      }
    case SEARCH_ARTICLES_SUCCESS:
      return {
        ...state,
        searchArticlesFetching: false,
        searchArticlesFetched: true,
        articles:action.payload,
        searchArticlesError: null,
      }
    case SEARCH_ARTICLES_ERROR:
      return {
        ...state,
        searchArticlesFetching: false,
        searchArticlesFetched: false,
        articles: [],
        searchArticlesError: action.payload,
      }
    case RESET_SEARCH_FETCHED_STATE:
      return {
        ...state,
        searchArticlesFetching: false,
        searchArticlesFetched: false,
        searchArticlesError: null,
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
    case RESET_ARTICLE_COUNT:
      return {
        ...state,
        articleCountFetching: false,
        articleCountFetched: false,
        articleCountError: null,
      }
    default:
      return state
  }
}

export default articleReducer