import axios from 'axios'

import {
  APP_URL,
  FETCH_ARTICLES_PENDING,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  FETCH_ARTICLE_PENDING,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_ERROR,
  SET_CURRENT_PAGE,
  SET_ARTICLE_TO_VIEW,
  SEARCH_ARTICLES_PENDING,
  SEARCH_ARTICLES_SUCCESS,
  SEARCH_ARTICLES_ERROR,
  SET_SEARCH_VALUE,
  RESET_SEARCH_FETCHED_STATE,
  RESET_ARTICLE_FETCHED_STATE,
  SET_LOCATION,
} from '../constants/types'

import history from '../history'

const articlesFetching = () => ({
  type: FETCH_ARTICLES_PENDING,
})

const articlesFetched = (payload) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload,
})

const articlesError = (error) => ({
  type: FETCH_ARTICLES_ERROR,
  payload: error,
})

export const fetchArticles = (pageNumber, date = '') => async (dispatch) => {
  const dateToSearch = date ? `&date=${date}` : ''
  dispatch(articlesFetching())
  try {
    const response = await axios.get(`${APP_URL}/api/article?pageNumber=${pageNumber}${dateToSearch}`)
    dispatch(articlesFetched(response.data))
  } catch (err) {
    dispatch(articlesError(err))
  }
}

export const setCurrentPage = (payload) => ({
  type: SET_CURRENT_PAGE,
  payload,
})

export const setArticleToView = (payload) => ({
  type: SET_ARTICLE_TO_VIEW,
  payload,
})

const articleFetching = () => ({
  type: FETCH_ARTICLE_PENDING,
})

const articleFetched = (payload) => ({
  type: FETCH_ARTICLE_SUCCESS,
  payload,
})

const articleError = (error) => ({
  type: FETCH_ARTICLE_ERROR,
  payload: error,
})

export const fetchArticle = (id) => async (dispatch) => {
  dispatch(articleFetching())
  try {
    const response = await axios.get(`${APP_URL}/api/article/${id}`)
    dispatch(articleFetched(response.data.data))
  } catch (err) {
    dispatch(articleError(err))
  }
}

const searchArticlePending = () => ({
  type: SEARCH_ARTICLES_PENDING,
})

const searchArticleSuccess = (payload) => ({
  type: SEARCH_ARTICLES_SUCCESS,
  payload
})

const searchArticleError = (error) => ({
  type: SEARCH_ARTICLES_ERROR,
  payload: error,
})

export const searchArticles = (query, pageNumber) => async (dispatch) => {
  dispatch(searchArticlePending())
  try {
    const response = await axios.get(`${APP_URL}/api/search?query=${query}&pageNumber=${pageNumber}`)
    dispatch(searchArticleSuccess(response.data))
    history.push(`/search/${query}`)
  } catch (err) {
    dispatch(searchArticleError(err))
  }
}

export const setSearchValue = (payload) => ({
  type: SET_SEARCH_VALUE,
  payload,
})

export const resetSearchFetchedState = () => ({
  type: RESET_SEARCH_FETCHED_STATE,
})

export const resetArticleFetchedState = () => ({
  type: RESET_ARTICLE_FETCHED_STATE,
})

export const setLocation = (payload) => ({
  type: SET_LOCATION,
  payload,
})