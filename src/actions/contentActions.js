import axios from 'axios'

import {
  APP_URL,
  FETCH_CONTENT_PENDING,
  FETCH_CONTENT_SUCCESS,
  FETCH_CONTENT_ERROR,
  SET_CONTENT_TO_EDIT,
  RESET_CONTENT_STATE,
  SAVE_CONTENT_TITLE,
  SAVE_CONTENT_TEXT,
  SUBMIT_EDIT_CONTENT_PENDING,
  SUBMIT_EDIT_CONTENT_SUCCESS,
  SUBMIT_EDIT_CONTENT_ERROR,
} from '../constants/types'

import history from '../history'

const fetchingContentPending = () => ({
  type: FETCH_CONTENT_PENDING,
})

const fetchingContentSuccess = (payload) => ({
  type: FETCH_CONTENT_SUCCESS,
  payload,
})

const fetchingContentError = (error) => ({
  type: FETCH_CONTENT_ERROR,
  payload: error,
})

export const fetchContent = () => async (dispatch) => {
  dispatch(fetchingContentPending())
  try {
    const response = await axios.get(`${APP_URL}/api/content`)
    dispatch(fetchingContentSuccess(response.data.data))
  } catch (err) {
    dispatch(fetchingContentError(err))
  }
}

export const setContentToEdit = (payload) => ({
  type: SET_CONTENT_TO_EDIT,
  payload,
})

export const saveContentTitle = (payload) => ({
  type: SAVE_CONTENT_TITLE,
  payload,
})

export const saveContentText = (payload) => ({
  type: SAVE_CONTENT_TEXT,
  payload,
})

export const submitEditContentPending = () => ({
  type: SUBMIT_EDIT_CONTENT_PENDING,
})

export const submitEditContentSuccess = (payload) => ({
  type: SUBMIT_EDIT_CONTENT_SUCCESS,
  payload,
})

export const submitEditContentError = (error) => ({
  type: SUBMIT_EDIT_CONTENT_ERROR,
  payload: error,
})

export const submitEditContent = (body) => async (dispatch, getState) => {
  dispatch(submitEditContentPending())
  const { userReducer } = getState()
  const { token } = userReducer
  try {
    const response = await axios.put(`${APP_URL}/api/content`, body, {
      headers: {
      'Authorization': `Bearer ${token}` 
      }
    })
    dispatch(submitEditContentSuccess(response.data))
    history.push(`/submissions`)
  } catch (err) {
    dispatch(submitEditContentError(err))
  }
}

export const resetContentState = () => ({
  type: RESET_CONTENT_STATE,
})