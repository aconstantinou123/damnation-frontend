import axios from 'axios'

import {
  APP_URL,
  FETCH_ARTICLES_PENDING,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
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

export const fetchArticles = () => async (dispatch) => {
  dispatch(articlesFetching())
  console.log('node env', process.env)
  try {
    const response = await axios.get(`${APP_URL}/api/article`)
    dispatch(articlesFetched(response.data.data))
  } catch (err) {
    dispatch(articlesError(err))
  }
}