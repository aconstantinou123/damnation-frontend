import axios from 'axios'
import history from '../history'

import {
  APP_URL,
  DELETE_ARTICLE_PENDING,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_ERROR,
  DELETE_ARTICLE_FILE_PENDING,
  DELETE_ARTICLE_FILE_SUCCESS,
  DELETE_ARTICLE_FILE_ERROR,
  EDIT_ARTICLE_FILE_PENDING,
  EDIT_ARTICLE_FILE_SUCCESS,
  EDIT_ARTICLE_FILE_ERROR,
  RESET_SUBMIT,
  SAVE_ARTICLE_CONTENT,
  SAVE_ARTICLE_TITLE,
  SAVE_ARTICLE_AUTHOR,
  SAVE_ARTICLE_IMG_URL,
  SAVE_ARTICLE_SUMMARY,
  SAVE_ARTICLE_IS_MAIN,
  SAVE_ARTICLE_FILE_PENDING,
  SAVE_ARTICLE_FILE_SUCCESS,
  SAVE_ARTICLE_FILE_ERROR,
  SELECT_ARTICLE_TO_EDIT,
  SET_FILE_UPLOADED,
  SET_IS_EXTERNAL_FILE,
  SUBMIT_CREATE_ARTICLE_PENDING,
  SUBMIT_CREATE_ARTICLE_SUCCESS,
  SUBMIT_CREATE_ARTICLE_ERROR,
  SET_UPLOAD_PROGRESS,
} from '../constants/types'

const setUploadProgress = (payload) => ({
  type: SET_UPLOAD_PROGRESS,
  payload,
})

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
      },
      onUploadProgress: data => dispatch(setUploadProgress((data.loaded / data.total) * 100)),
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
    dispatch(saveArticleFileError(err.response.data.message))
  }
}

const editArticleFilePending = () => ({
  type: EDIT_ARTICLE_FILE_PENDING,
})

const editArticleFileSuccess = (payload) => ({
  type: EDIT_ARTICLE_FILE_SUCCESS,
  payload
})

const editArticleFileError = (error) => ({
  type: EDIT_ARTICLE_FILE_ERROR,
  payload: error,
})

export const editArticleFile = (body) => async (dispatch, getState) => {
  dispatch(editArticleFilePending())
  const { userReducer } = getState()
  const { articleFormReducer } = getState()
  const { token } = userReducer
  const { article } = body
  const { selectedFile, articleIsExternalFile } = articleFormReducer
  const formData = new FormData()
  //Missing file - shouldn't happen
  if (!selectedFile && !article.filename) {
    return dispatch(editArticleFileError('Missing file'))
  }
  if(articleIsExternalFile) {
    //Same file no change
    if(!selectedFile && article.filename) {
      // console.log('Same file no change')
      return dispatch(submitArticleEdit(body))
    }
    //Change type to external
    else if(selectedFile.name && !article.filename) {
      // console.log('Change type to external')
      formData.append('NewFile', selectedFile)
    }
    //Change external file
    else if(selectedFile.name !== article.filename) {
      // console.log('Change external file')
      formData.append('FileToDelete', article.filename)
      formData.append('NewFile', selectedFile)
    }
    // User error same file selected
    else if(selectedFile.name === article.filename) {
      // console.log('User error same file selected')
      return dispatch(editArticleFileError('Same file selected'))
    }
  } else {
     //Delete file (switch article type) 
    if(article.filename) {
      formData.append('FileToDelete', article.filename)
      // console.log('Delete article and switch type')
    }
  }
  try {
    const response = await axios.put(`${APP_URL}/api/files`, formData, {
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: data => dispatch(setUploadProgress((data.loaded / data.total) * 100)),
    })
    dispatch(editArticleFileSuccess(response.data.filename))
    dispatch(submitArticleEdit({
      ...body,
      article: {
        ...body.article,
        filename: response.data.filename
      }
    }))
  } catch (err) {
    dispatch(editArticleFileError(err.response.data.message))
  }
}

const deleteArticleFilePending = () => ({
  type: DELETE_ARTICLE_FILE_PENDING,
})

const deleteArticleFileSuccess = (payload) => ({
  type: DELETE_ARTICLE_FILE_SUCCESS,
  payload,
})

const deleteArticleFileError = (error) => ({
  type: DELETE_ARTICLE_FILE_ERROR,
  payload: error,
})

export const deleteArticleFile = (filename) => async (dispatch, getState) => {
  dispatch(deleteArticleFilePending())
  const { userReducer } = getState()
  const { token } = userReducer
  try {
    const response = await axios.delete(`${APP_URL}/api/files/${filename}`, {
      headers: {
      'Authorization': `Bearer ${token}` 
      }
    })
    dispatch(deleteArticleFileSuccess(response.data))
    history.push('/')
  } catch (err) {
    dispatch(deleteArticleFileError(err))
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
  const { content, filename } = article
  if (!content && !filename) {
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
  const { location, currentArticle } = articleReducer
  const { token } = userReducer
  try {
    await axios.delete(`${APP_URL}/api/article/${id}`, {
      headers: {
      'Authorization': `Bearer ${token}` 
      }
    })
    dispatch(deleteArticleSuccess())
    if(currentArticle.filename) {
      dispatch(deleteArticleFile(currentArticle.filename))
    }
    history.push(location)
  } catch (err) {
    dispatch(deleteArticleError(err))
  }
}

export const resetSubmit = () => ({
  type: RESET_SUBMIT,
})