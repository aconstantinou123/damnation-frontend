import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'

import Loading from '../components/Loading/Loading'

const PrivateRoute = ({
  userFetching,
  user,
  component: ComponentToRender,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (userFetching) {
        return <Loading/>
      }
      if (!user && !userFetching) {
        return <Redirect to="/" />
      }
      return <ComponentToRender {...props} />
    }}
  />
)

const mapStateToProps = (state) => {
  return {
    ...state.userReducer,
  }
}

export default connect(mapStateToProps)(PrivateRoute)
