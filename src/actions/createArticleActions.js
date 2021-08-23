import axios from 'axios'
import history from '../history'

import {
  SAVE_ARTICLE_CONTENT,
  SAVE_ARTICLE_TITLE,
  SAVE_ARTICLE_AUTHOR,
  SAVE_ARTICLE_IMG_URL,
  SAVE_ARTICLE_SUMMARY,
  SAVE_ARTICLE_IS_MAIN,
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

export const submitArticlePending = () => ({
  type: SUBMIT_CREATE_ARTICLE_PENDING,
})

export const submitArticleSuccess = (payload) => ({
  type: SUBMIT_CREATE_ARTICLE_SUCCESS,
  payload,
})

export const submitArticleError = (error) => ({
  type: SUBMIT_CREATE_ARTICLE_ERROR,
  payload: error,
})


export const submitArticle = (body) => async (dispatch) => {
  dispatch(submitArticlePending())
  try {
    const response = await axios.post('http://localhost/api/article', body)
    dispatch(submitArticleSuccess(response.data))
    history.push('/')
  } catch (err) {
    dispatch(submitArticleError(err))
  }
}