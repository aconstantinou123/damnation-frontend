import axios from 'axios'

import {
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
  try {
    const response = await axios.get('http://localhost/api/article')
    dispatch(articlesFetched(response.data.data))
  } catch (err) {
    dispatch(articlesError(err))
  }
}