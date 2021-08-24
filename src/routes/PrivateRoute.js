import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'

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
        return <h3>Loading...</h3>
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
