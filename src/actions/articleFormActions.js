import axios from 'axios'
import history from '../history'

import {
  DELETE_ARTICLE_PENDING,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_ERROR,
  SAVE_ARTICLE_CONTENT,
  SAVE_ARTICLE_TITLE,
  SAVE_ARTICLE_AUTHOR,
  SAVE_ARTICLE_IMG_URL,
  SAVE_ARTICLE_SUMMARY,
  SAVE_ARTICLE_IS_MAIN,
  SELECT_ARTICLE_TO_EDIT,
  SUBMIT_CREATE_ARTICLE_PENDING,
  SUBMIT_CREATE_ARTICLE_SUCCESS,
  SUBMIT_CREATE_ARTICLE_ERROR,
} from '../constants/types'

export const saveArticleContent = (payload) => ({
  type: SAVE_ARTICLE_CONTENT,
  payload
})

export const saveArticleTitle = (payload) => ({
  type: SAVE_ARTICLE_TITLE,
  payload
})

export const saveArticleAuthor = (payload) => ({
  type: SAVE_ARTICLE_AUTHOR,
  payload
})

export const saveArticleImgUrl = (payload) => ({
  type: SAVE_ARTICLE_IMG_URL,
  payload
})

export const saveArticleSummary = (payload) => ({
  type: SAVE_ARTICLE_SUMMARY,
  payload
})

export const saveArticleIsMain = () => ({
  type: SAVE_ARTICLE_IS_MAIN,
})

export const selectArticleToEdit = (payload) => ({
  type: SELECT_ARTICLE_TO_EDIT,
  payload
})

const submitArticlePending = () => ({
  type: SUBMIT_CREATE_ARTICLE_PENDING,
})

const submitArticleSuccess = (payload) => ({
  type: SUBMIT_CREATE_ARTICLE_SUCCESS,
  payload,
})

const submitArticleError = (error) => ({
  type: SUBMIT_CREATE_ARTICLE_ERROR,
  payload: error,
})

export const submitArticleCreate = (body) => async (dispatch, getState) => {
  dispatch(submitArticlePending())
  const { userReducer } = getState()
  const { token } = userReducer
  try {
    const response = await axios.post('http://localhost/api/article', body, {
      headers: {
      'Authorization': `Bearer ${token}` 
      }
    })
    dispatch(submitArticleSuccess(response.data))
    history.push('/')
  } catch (err) {
    dispatch(submitArticleError(err))
  }
}

export const submitArticleEdit = (body) => async (dispatch, getState) => {
  dispatch(submitArticlePending())
  const { userReducer } = getState()
  const { token } = userReducer
  try {
    const response = await axios.put('http://localhost/api/article', body, {
      headers: {
      'Authorization': `Bearer ${token}` 
      }
    })
    dispatch(submitArticleSuccess(response.data))
    history.push(`/article/${body.article.id}`)
  } catch (err) {
    dispatch(submitArticleError(err))
  }
}

const deleteArticlePending = () => ({
  type: DELETE_ARTICLE_PENDING,
})

const deleteArticleSuccess = () => ({
  type: DELETE_ARTICLE_SUCCESS,
})

const deleteArticleError = (error) => ({
  type: DELETE_ARTICLE_ERROR,
  payload: error,
})

export const deleteArticle = (id) => async (dispatch, getState) => {
  dispatch(deleteArticlePending())
  const { userReducer } = getState()
  const { token } = userReducer
  try {
    await axios.delete(`http://localhost/api/article/${id}`, {
      headers: {
      'Authorization': `Bearer ${token}` 
      }
    })
    dispatch(deleteArticleSuccess())
    history.push('/')
  } catch (err) {
    dispatch(deleteArticleError(err))
  }
}