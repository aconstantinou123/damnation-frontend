import React, { useState } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as userActions from '../../actions/userActions'

import './Login.css'

const Login = ({
  login,
  userError,
}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOnSubmit = e => {
    e.preventDefault()
    const body = {
      email,
      password,
    }
    login(body)
  }

  const handleOnEmailChange = e => {
    setEmail(e.target.value)
  }

  const handleOnPasswordChange = e => {
    setPassword(e.target.value)
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleOnSubmit}>
        <label>
          <p>Email</p>
          <input 
            type="text" 
            value={email}
            onChange={handleOnEmailChange}
          />
        </label>
        <label>
          <p>Password</p>
          <input 
            type="password"
            value={password}
            onChange={handleOnPasswordChange}
          />
        </label>
        <div className="login-submit-container">
          <button type="submit">Submit</button>
        </div>
        {
          (userError && userError.message === 'Request failed with status code 401') &&
          <p>Invalid email or password</p>
        }
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      ...userActions
    },
    dispatch
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.userReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
