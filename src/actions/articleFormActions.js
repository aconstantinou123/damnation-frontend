import axios from 'axios'
import history from '../history'

import {
  APP_URL,
  DELETE_ARTICLE_PENDING,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_ERROR,
  SET_FILE_UPLOADED,
  SET_IS_EXTERNAL_FILE,
  SAVE_ARTICLE_CONTENT,
  SAVE_ARTICLE_TITLE,
  SAVE_ARTICLE_AUTHOR,
  SAVE_ARTICLE_IMG_URL,
  SAVE_ARTICLE_SUMMARY,
  SAVE_ARTICLE_IS_MAIN,
  SELECT_ARTICLE_TO_EDIT,
  SAVE_ARTICLE_FILE_PENDING,
  SAVE_ARTICLE_FILE_SUCCESS,
  SAVE_ARTICLE_FILE_ERROR,
  SUBMIT_CREATE_ARTICLE_PENDING,
  SUBMIT_CREATE_ARTICLE_SUCCESS,
  SUBMIT_CREATE_ARTICLE_ERROR,
  RESET_SUBMIT,
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
  payload,
})

export const setIsExternalFile = () => ({
  type: SET_IS_EXTERNAL_FILE,
})

export const setFileUploaded = (payload) => ({
  type: SET_FILE_UPLOADED,
  payload,
})

export const saveArticleFilePending = () => ({
  type: SAVE_ARTICLE_FILE_PENDING,
})

export const saveArticleFileSuccess = (payload) => ({
  type: SAVE_ARTICLE_FILE_SUCCESS,
  payload,
})

export const saveArticleFileError = (error) => ({
  type: SAVE_ARTICLE_FILE_ERROR,
  payload: error
})

export const saveArticleFile = (body) => async (dispatch, getState) => {
  dispatch(saveArticleFilePending())
  const { userReducer } = getState()
  const { articleFormReducer } = getState()
  const { token } = userReducer
  const { selectedFile } = articleFormReducer
  if (!selectedFile) {
    return dispatch(saveArticleFileError('Article file required'))
  }
  try {
    const formData = new FormData()
		formData.append('File', selectedFile)
    const response = await axios.post(`${APP_URL}/api/files`, formData, {
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      }
    })
    dispatch(saveArticleFileSuccess(response.data.filename))
    dispatch(submitArticleCreate({
      ...body,
      article: {
        ...body.article,
        filename: response.data.filename
      }
    }))
  } catch (err) {
    dispatch(saveArticleFileError(err))
  }
}

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
  const { article } = body
  const { content, filename } = article
  if (!content && !filename) {
    return dispatch(submitArticleError('Article contents required'))
  }
  try {
    const response = await axios.post(`${APP_URL}/api/article`, body, {
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
  const { article } = body
  const { content } = article
  if (!content) {
    return dispatch(submitArticleError('Article contents required'))
  }
  try {
    const response = await axios.put(`${APP_URL}/api/article`, body, {
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
  const { articleReducer } = getState()
  const { location } = articleReducer
  const { token } = userReducer
  try {
    await axios.delete(`${APP_URL}/api/article/${id}`, {
      headers: {
      'Authorization': `Bearer ${token}` 
      }
    })
    dispatch(deleteArticleSuccess())
    history.push(location)
  } catch (err) {
    dispatch(deleteArticleError(err))
  }
}

export const resetSubmit = () => ({
  type: RESET_SUBMIT,
})