import axios from 'axios'

import {
  APP_URL,
  FETCH_ARTICLES_PENDING,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  FETCH_ARTICLE_PENDING,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_ERROR,
  FETCH_ARTICLE_COUNT_SUCCESS,
  FETCH_ARTICLE_COUNT_PENDING,
  FETCH_ARTICLE_COUNT_ERROR,
  RESET_ARTICLE_COUNT,
  SET_CURRENT_PAGE,
  SET_ARTICLE_TO_VIEW,
} from '../constants/types'

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
    dispatch(articlesFetched(response.data.data))
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

const articleCountFetching = () => ({
  type: FETCH_ARTICLE_COUNT_PENDING,
})

const articleCountFetched = (payload) => ({
  type: FETCH_ARTICLE_COUNT_SUCCESS,
  payload,
})

const articleCountError = (error) => ({
  type: FETCH_ARTICLE_COUNT_ERROR,
  payload: error,
})

export const fetchArticleCount = (date = '') => async (dispatch) => {
  const dateToSearch = date ? `?date=${date}` : ''
  dispatch(articleCountFetching())
  try {
    const response = await axios.get(`${APP_URL}/api/article-count${dateToSearch}`)
    dispatch(articleCountFetched(response.data.total))
  } catch (err) {
    dispatch(articleCountError(err))
  }
}

export const resetArticleCount = () => ({
  type: RESET_ARTICLE_COUNT,
})