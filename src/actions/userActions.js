import axios from 'axios'

import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from '../constants/types'

import history from '../history'

const loginPending = () => ({
  type: LOGIN_PENDING
})

const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
})

const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error,
})

export const login = (body) => async (dispatch) => {
  dispatch(loginPending())
  try {
    const response = await axios.post('http://localhost/api/login', body, { withCredentials: true })
    dispatch(loginSuccess(response.data))
    history.push('/')
  } catch (err) {
    dispatch(loginError(err))
  }
}

export const persistLogin = () => async (dispatch) => {
  dispatch(loginPending())
  try {
    const response = await axios.post('http://localhost/api/persist-login', {}, { withCredentials: true })
    dispatch(loginSuccess(response.data))
  } catch (err) {
    dispatch(loginError(err))
  }
}

const logoutPending = () => ({
  type: LOGOUT_PENDING,
})

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
})

const logoutError = (error) => ({
  type: LOGOUT_ERROR,
  payload: error
})

export const logout = () => async (dispatch) => {
  dispatch(logoutPending())
  try {
    await axios.post('http://localhost/api/logout', {}, { withCredentials: true })
    dispatch(logoutSuccess())
    history.push('/')
  } catch (err) {
    dispatch(logoutError(err))
  }
}